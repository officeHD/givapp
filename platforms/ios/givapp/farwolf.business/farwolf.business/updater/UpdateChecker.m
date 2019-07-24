//
//  UpdateChecker.m
//  farwolf.business
//
//  Created by 郑江荣 on 2017/4/17.
//  Copyright © 2017年 郑江荣. All rights reserved.
//

#import "UpdateChecker.h"
#import "farwolf.h"
#import "UpdateJsonReader.h"
#import "UpdateJson.h"
#import "UpdateDialogControl.h"
#import "ZipDownloader.h"
#import "URL.h"
#import "JsVersion.h"
#import <WeexSDK/WeexSDK.h>
#import "ZipDownloaderControl.h"

@implementation UpdateChecker

 
-(void)doCheck:(NSString*)appid vcode:(NSString*)vcode  showprogress:(BOOL)showprogress failtoast:(BOOL)failtoast vc:(UIViewController*)vc success :(void(^)(Version*v))success theme:(NSString*)theme fail :(void(^)())fail;
{
    UpdateJsonReader *j=[[UpdateJsonReader alloc]init];
    j.url=self.url;
    [j addParam:@"appid" value:appid];
    [j addParam:@"systype" value:@"0"];
    [j addParam:@"vcode" value:vcode];
    
 
    
    LockScreenProgress *p= [[LockScreenProgress alloc]initWith:[self getCurrentVc].view];
    [j excuteFull:^{
        if(showprogress)
        [p show];
    } success:^(Json *j) {
        
         Version *v=  [Version yy_modelWithJSON:[j getDict:@"version"]];
        NSString *lastchecktime= [self getSaveValue:@"lastchecktime"];
        if(v.level==0)
        {
            if(lastchecktime!=nil&&![lastchecktime isEqualToString:@""])
            {
                
                NSTimeInterval now=  [[NSDate date] timeIntervalSince1970];
                if(now -[lastchecktime doubleValue]<1000*60*60*24*7)
                {
                    return;
                }
                else
                {
                    //             [[@"" addDouble:now] save:@"lastchecktime"];
                    [self remove:@"lastchecktime"];
                }
            }
        }
        
       
        UpdateDialogControl *cvc=[[UpdateDialogControl alloc]initWithNibName:@"updater" bundle:nil];
        cvc.view.frame=[UIApplication sharedApplication].keyWindow.frame;
        [cvc initBean:v];
        cvc.themeColor=theme;
        [vc.parentViewController addVc:cvc];
        success(v);
    } fail:^(Json *j, NSInteger code, NSString *msg) {
        if(failtoast)
        {
            [[self getCurrentVc] toast:msg];
        }
        fail();
    } exception:^{
        if(failtoast)
        {
              [[self getCurrentVc] toast:@"网络异常！"];
        }
    } compelete:^{
         if(showprogress)
          [p hide];
    }];
}


-(void)doCheckJs:(NSString*)appid jsversion:(NSString*)jsversion nativecode:(NSString*)nativecode showprogress:(BOOL)showprogress failtoast:(BOOL)failtoast vc:(UIViewController*)vc success :(void(^)(JsVersion*v))success theme:(NSString*)theme;
{
    UpdateJsonReader *j=[[UpdateJsonReader alloc]init];
    j.url=self.url;
    
    
     
    [j addParam:@"appid" value:appid];
    [j addParam:@"systype" value:@"0"];
    [j addParam:@"jsversion" value:jsversion];
    [j addParam:@"nativeversion" value:nativecode];
    
    
    LockScreenProgress *p= [[LockScreenProgress alloc]initWith:vc.view];
    [j excuteFull:^{
        if(showprogress)
            [p show];
    } success:^(Json *j) {
        
        JsVersion *v=  [JsVersion yy_modelWithJSON:[j getDict:@"version"]];
        
        
        
        
        if(v.mode==0)
        {

            [self updateJs:_url version:v progress:^(float p) {
                
            } compelete:^(NSString *path) {
                
            }];
        }
        else
        {
            ZipDownloaderControl *cvc=[[ZipDownloaderControl alloc]initWithNibName:@"zipdownloader" bundle:nil];
            cvc.url=v.url;
            cvc.jsVersion=v;
            cvc.view.frame=[UIApplication sharedApplication].keyWindow.frame;
            [vc addVc:cvc];
          
        }

        success(v);
        
        
    } fail:^(Json *j, NSInteger code, NSString *msg) {
        if(failtoast)
        {
            [[self getCurrentVc] toast:msg];
        }
    } exception:^{
        if(failtoast)
        {
            [[self getCurrentVc] toast:@"网络异常！"];
        }
    } compelete:^{
        if(showprogress)
            [p hide];
    }];
}


-(void)updateJs:(NSString*)url version:(JsVersion*)jsversion  progress:(void(^)(float))progress compelete:(void(^)(NSString*))compelete
{
    NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
    NSString *path = [paths objectAtIndex:0];
    path=[path add:@"/zip"];
    [path mkdir];
    path=[path add:@"/app.zip"];
    [path delete];
//    NSString *url=@"http://59.110.169.246/img/app.zip";
    ZipDownloader *zip= [[ZipDownloader alloc] initWidthUrl:url path:path progress:^(float p,NSInteger current,NSInteger total) {
        
        progress(p);
    } compelete:^(NSString *path) {
        compelete(path);
        
        NSString *version=[@"" addInt: jsversion.js_version];
        [version save:@"downloadJsVersion"];
        if(jsversion.mode==2)
        {
            
            UIAlertController *alert = [UIAlertController alertControllerWithTitle:@"提示" message:@"更新包️已下载完毕,是否退出应用重新加载?" preferredStyle: UIAlertControllerStyleAlert];
            UIAlertAction *actionCancel = [UIAlertAction actionWithTitle:@"取消" style:UIAlertActionStyleCancel
                                                                 handler:^(UIAlertAction *action) {
                                                                     [alert dismiss:true];
                                                                 }];
            UIAlertAction *actionok = [UIAlertAction actionWithTitle:@"确定" style:UIAlertActionStyleDefault handler:^(UIAlertAction *action) {
                
                [URL unzip:@"zip/app.zip" to:@""];
                NSLog(@"解压完毕");
                
            }];
        
            [alert addAction:actionok];
            [alert addAction:actionCancel];
            UIViewController *rootVC = [[UIApplication sharedApplication].delegate window].rootViewController;
            [ [rootVC TopViewController] presentViewController:alert animated:YES completion:^{
                
            }];
        }
       
        
    } exception:^(NSError *err) {
        
    }];
    
    [zip start];
}





@end
