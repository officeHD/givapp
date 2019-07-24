//
//  WeexFactory.m
//  Pods
//
//  Created by 郑江荣 on 2017/6/1.
//
//

#import "WeexFactory.h"
#import "Weex.h"
#import "URL.h"
static NSMutableDictionary *pageCache;
@implementation WeexFactory

+(void)addCache:(NSString*)url vc:(WXNormalViewContrller*)vc
{
    if([url contains:@"?random"])
    {
        url=[url split:@"?random"][0];
    }
    if(pageCache==nil)
        pageCache=[NSMutableDictionary new];
    [pageCache setValue:vc forKey:url];
}
+(WXNormalViewContrller*)getCache:(NSString*)url
{
    if(url==nil)
        return nil;
    if([url contains:@"?random"])
    {
        url=[url split:@"?random"][0];
    }
    if(pageCache==nil)
         pageCache=[NSMutableDictionary new];
    WXNormalViewContrller *vc= [pageCache objectForKey:url];
    [pageCache removeObjectForKey:url];
    return vc;
}


+ (void)render:(NSURL *)sourceURL  compelete:(void(^)(Page*))complete
{
 
//    if([Weex getBaseUrl] ==nil||[[Weex getBaseUrl] isEqualToString:@""])
//        [Weex setBaseUrl:sourceURL.absoluteString];
    Page *p=[Page new];
    p.instance = [[WXSDKInstance alloc] init];
    p.instance.frame = CGRectMake(0.0f, 0.0f, [UIScreen mainScreen].bounds.size.width, [UIScreen mainScreen].bounds.size.height);
    p.instance.pageObject = self;
    NSString *newURL = nil;
 
    NSString *abs=sourceURL.absoluteString;
    if ([abs rangeOfString:@"?"].location != NSNotFound) {
        newURL = [NSString stringWithFormat:@"%@&random=%d", sourceURL.absoluteString, arc4random()];
    } else {
        newURL = [NSString stringWithFormat:@"%@?random=%d", sourceURL.absoluteString, arc4random()];
    }
    [p.instance renderWithURL:[NSURL URLWithString:newURL] options:@{@"bundleUrl":sourceURL.absoluteString} data:nil];
    
    p.url=newURL;
    __strong __typeof(p) weakP = p;
    p.instance.onCreate = ^(UIView *view) {
 
        view.frame=CGRectMake(0.0f, 0.0f, [UIScreen mainScreen].bounds.size.width, [UIScreen mainScreen].bounds.size.height);
        weakP.weexView=view;
        complete(weakP);
        
    
    };
    
    
    p.instance.onFailed = ^(NSError *error) {
        
        NSString *msg=error.userInfo[@"NSLocalizedDescription"];
        NSLog(@"%@", msg);
    
    };
    
    
    p.instance.renderFinish = ^(UIView *view) {
//        [weakSelf _updateInstanceState:WeexInstanceAppear];
//        [_instance fireGlobalEvent:@"onPageInit" params:nil];
        p.hasload=true;
    };
 
    
}


+(void)preRender:(NSURL *)sourceURL success:(void(^)(NSString*url))success
{
    
//    [self renderNew:sourceURL compelete:^(WXNormalViewContrller *vc) {
//
//        [self addCache:sourceURL.absoluteString vc:vc];
//
//    } fail:^(NSString *s) {
//
//    }  frame:[[UIApplication sharedApplication] keyWindow].bound isPortrait:true];
    
    [self renderNew:sourceURL compelete:^(WXNormalViewContrller *vc) {
         [self addCache:sourceURL.absoluteString vc:vc];
         success(sourceURL.absoluteString);
    } fail:^(NSString *s) {
        
    } frame:[[UIApplication sharedApplication] keyWindow].bounds isPortrait:true];
}

+ (void)renderNew:(NSURL *)sourceURL  compelete:(void(^)(WXNormalViewContrller*))complete  fail:(void(^)(NSString*))fail frame:(CGRect)frame isPortrait:(BOOL)isPortrait
{

    [Weex initAppBoardContent];
    Page *p=[Page new];
    p.instance = [[WXSDKInstance alloc] init];
    p.instance.frame =frame;
//    p.instance.pageObject = self;
    
  
    WXNormalViewContrller *vc=[self getCache:sourceURL.absoluteString];
    if(vc)
    {
        complete(vc);
        return;
    }
    
//    NSString *newURL = nil;
    
//    if ([sourceURL.absoluteString rangeOfString:@"?"].location != NSNotFound) {
//        newURL = [NSString stringWithFormat:@"%@&random=%d", sourceURL.absoluteString, arc4random()];
//    } else {
//        newURL = [NSString stringWithFormat:@"%@?random=%d", sourceURL.absoluteString, arc4random()];
//    }
//    [p.instance renderWithURL:[NSURL URLWithString:newURL] options:@{@"bundleUrl":sourceURL.absoluteString} data:nil];
//    p.instance.scriptURL=[NSURL URLWithString:newURL];
    [WeexFactory downloadJs:sourceURL.absoluteString instance: p.instance];
    //    [p.instance renderWithURL:[NSURL URLWithString:newURL] options:@{@"bundleUrl":sourceURL.absoluteString} data:nil];
    p.instance.scriptURL=sourceURL;
    p.url=sourceURL;
    __strong __typeof(p) weakP = p;
//    __weak __typeof(complete) weakComplete = complete;
    p.instance.onCreate = ^(UIView *view) {
        
 
        weakP.weexView=view;
        WXNormalViewContrller *vc=[[WXNormalViewContrller alloc]initWithSourceURL:sourceURL.absoluteString];
        vc.isLanscape=!isPortrait;
       
//        if(isPortrait)
//        vc=[[WXNormalViewContrller alloc]initWithSourceURL:sourceURL.absoluteString];
//        else
//           vc= [[LanscapeViewContoller alloc]initWithSourceURL:sourceURL.absoluteString];
//        LanscapeViewContoller
        vc.hidesBottomBarWhenPushed = YES;
        vc.page=weakP;
        vc.navbarVisibility=@"hidden";
        vc.sourceURL=sourceURL;
    
        vc.instance=weakP.instance;
        weakP.instance.frame=frame;
        weakP.instance.viewController=vc;
         printf("viewDidLoad retain count = %ld\n",CFGetRetainCount((__bridge CFTypeRef)(vc)));
//          complete(vc);
         __weak __typeof(vc) weakVc = vc;
        UIWindow *window = [UIApplication sharedApplication].keyWindow;
        UIViewController *rootViewController = window.rootViewController;
        [rootViewController.view addSubview:weakP.weexView];
        [rootViewController addChildViewController:vc];
       
        
        
        
    };
    
    weakP.instance.renderFinish = ^(UIView *view) {
        
        UIViewController *vc=[view getCurrentVc].childViewControllers[1];
        [vc removeFromParentViewController];
        [weakP.weexView removeFromSuperview];
        printf("viewDidLoad retain count = %ld\n",CFGetRetainCount((__bridge CFTypeRef)(vc)));
        complete(vc);
         printf("viewDidLoad retain count = %ld\n",CFGetRetainCount((__bridge CFTypeRef)(vc)));
    };
  
    weakP.instance.onFailed = ^(NSError *error) {
        
        NSString *msg=error.userInfo[@"NSLocalizedDescription"];
        NSLog(@"%@", msg);
        fail(msg);
        
    };
    
    
    
    
    
    
}


+(void)downloadJs:(NSString*)url instance:(WXSDKInstance*)instance{
   
    if(![url startWith:@"http"]){
        [instance renderWithURL:[NSURL URLWithString:url] options:@{@"bundleUrl":url}  data:nil];
        return;
    }
    url=[NSString stringWithFormat:@"%@?random=%d", url, arc4random()];
    NSString *board=  [WXSDKInstance getAppBoardContent];
    NSString *boardmd5=[board toMd5];
    url=[[url add:@"&md5="]add:boardmd5];
    [instance renderWithURL:[NSURL URLWithString:url] options:@{@"bundleUrl":url}  data:nil];
//    instance.scriptURL=[NSURL URLWithString:url];
//    url=[NSString stringWithFormat:@"%@?random=%d", url, arc4random()];
//    NSString *board=  [WXSDKInstance getAppBoardContent];
//    NSString *boardmd5=[board toMd5];
//    url=[[url add:@"&md5="]add:boardmd5];
//    JsonReader *j=[JsonReader new];
//    j.url=url;
//    [j excuteNoLimit:^{
//
//    } success:^(Json *j) {
//        NSString *bs=  j.backString;
//        NSString *bo=@"";
//        NSString *sp=@"weexplus_split_weexplus";
//        if([bs contains:sp]){
//            bo=[bs split:sp][0];
//            [WXSDKInstance setAppBoardContent:bo];
//            bs=[bs replace:sp withString:@""];
//        }else{
//            bs=[board add:bs];
//        }
//        [instance renderView:bs options:@{@"bundleUrl":url} data:   nil];
//    } exception:^{
//
//    } compelete:^{
//
//    } usePost:false];
}

+(void)preRenderAll:(NSMutableArray*)urls  compelete:(void(^)())complete fail:(void(^)(NSString *))fail
{
    if(urls==nil)
        return;
      __block int c=0;
    for(NSString *url in urls )
    {
        if(c==-1)
            break;
        NSString *temp=@"";
        NSURL *nurl=nil;
        if([url startWith:@"root:"])
        {
            temp=[url replace:@"root:" withString:@"app/"];
        }
        if([temp startWith:@"http"])
        {
            nurl=[NSURL URLWithString:temp];
        }
        else
        {
            
           
            nurl=  [URL loadLocal:temp];
        }
        if(nurl==nil)
        {
            fail(@"");
            c=-1;
            return;
        }
        [self renderNew:nurl compelete:^(WXNormalViewContrller *vc) {
            
            c++;
            [self addCache:vc.sourceURL.absoluteString vc:vc];
            if(c==urls.count)
            {
                complete();
            }
        } fail:^(NSString *msg) {
            fail(msg);
            c=-1;
        }  frame:[UIApplication sharedApplication].keyWindow.bounds isPortrait:true];
    }
}

+(NSString*)getUrl:(NSString*)url instance:(WXSDKInstance*)instance
{
    if([url startWith:@"root:"])
    {
        url=[url replace:@"root:" withString:[Weex getBaseUrl:instance]];
    }
    NSString *newURL = url;
    if ([url hasPrefix:@"//"]) {
        newURL = [NSString stringWithFormat:@"http:%@", url];
    } else if (![url hasPrefix:@"http"]) {
        newURL = [NSURL URLWithString:url relativeToURL:instance.scriptURL].absoluteString;
    }
    return newURL;
}



@end
