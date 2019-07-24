package com.farwolf.weex.view;

import android.content.Context;
import android.support.v4.widget.DrawerLayout;
import android.util.AttributeSet;
import android.util.Log;
import android.view.ViewGroup;
import android.widget.LinearLayout;

import com.farwolf.base.ViewBase;
import com.farwolf.util.ScreenTool;
import com.farwolf.weex.R;

import org.androidannotations.annotations.Bean;
import org.androidannotations.annotations.Click;
import org.androidannotations.annotations.EViewGroup;
import org.androidannotations.annotations.ViewById;

/**
 * Created by even on 2017/10/18.
 */
@EViewGroup
public class DrawerLayoutView extends ViewBase {
    @Bean
    public ScreenTool tool;

    @ViewById
    public LinearLayout main_view;
    @ViewById
    public LinearLayout nav_view;
    @ViewById
    public DrawerLayout drawer_layout;

    public DrawerLayoutView(Context context, AttributeSet attrs) {
        super(context, attrs);
    }

    public DrawerLayoutView(Context context) {
        super(context);
    }


    @Override
    public int getViewId() {
        return R.layout.drawerlayoutview;
    }

    @Override
    public void init() {
        Log.e("init state", "init");
    }

//    public void setSlidUrl(String url)
//    {
//         WeexActivity a= (WeexActivity)getActivity();
//        Map param=a.getIntent().getParcelableExtra("param");
//        nav_view.setSrc(url,getContext(),param);
//        Log.e("nav_view url", url);
//    }
//
//    public void setMainUrl(String url)
//    {
//        WeexActivity a= (WeexActivity)getActivity();
//        Map param=a.getIntent().getParcelableExtra("param");
//        main_view.setSrc(url,getContext(),param);
//        Log.e("main_view url", url);
//    }

    public void setMainView(ViewGroup v)
    {
//
        main_view.addView(v);
    }

    public void setSlidView(ViewGroup v)
    {

        nav_view.addView(v);
    }



    public void setLeftWidth(int width)
    {
        if(nav_view==null)
            return;
        DrawerLayout.LayoutParams o= ( DrawerLayout.LayoutParams) nav_view.getLayoutParams();
        o.width=width;
        nav_view.setLayoutParams(null);
        nav_view.setLayoutParams(o);



    }

//    public void setChildContext(Context c)
//    {
//        this.main_view.instance.setContext(c);
//        this.nav_view.instance.setContext(c);
//
//    }
//
//    public void setParentInstance(WXSDKInstance instance)
//    {
//
//        this.main_view.setParentInstance(instance);
//        this.nav_view.setParentInstance(instance);
//
//
//    }



    @Click
    public void main_viewClicked() {

    }
}
