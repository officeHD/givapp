import asCore from './core'
import data from './data'
const net = weex.requireModule("net");
var debug = true;
// 查询物流上传文件
export const upload = (state, cb) => {
	if (debug) {
		cb(data.returnSucces);
	} else {
		net.postFile("http://gj.i2f2f.com/index.php/web/upload/upload", {
				type: state.type
			}, {},
		{
				file: state.file
			}, sta => {},
			res => {
				cb(res)
			}, ove => {}, err => {}
			);
	}

}


// 查询物流
export const get_order_express = (data, cb) => {
	if (debug) {
		cb(data.returnExpress);
	} else {
		asCore.post(`web/order/get_order_express`, data, cb)
	}

}
// 发送验证码接口
export const send_verify = (data, cb) => {
	if (debug) {
		cb(data.returnSucces);
	} else {
		asCore.post(`web/login/send_verify`, data, cb)
	}

}
// 用户账号登录接口
export const login = (data, cb) => {
	if (debug) {
		cb(data.returnLogin);
	} else {
		asCore.post(`web/login/index`, data, cb)
	}
}
// 用户验证码登录接口
export const verify_login = (data, cb) => {
	if (debug) {
		cb(data.returnLogin);
	} else {
		asCore.post(`web/login/verify_login`, data, cb)
	}
}
// 用户注册接口
export const register = (data, cb) => {
	if (debug) {
		cb(data.returnLogin);
	} else {
		asCore.post(`web/login/register`, data, cb)
	}
}
// 绑定手机号接口 - 邮箱注册登录后绑定
export const bind_mobile = (data, cb) => {
	if (debug) {
		cb(data.returnLogin);
	} else {
		asCore.post(`web/login/bind_mobile`, data, cb)
	}
}
// 修改密码接口 - 有原密码
export const edit_password = (data, cb) => {
	if (debug) {
		cb(data.returnSucces);
	} else {
		asCore.post(`web/login/edit_password`, data, cb)
	}
}
// 手机号验证接口 - 手机验证码修改密码
export const verify_mobile = (data, cb) => {
	if (debug) {
		cb(data.returnSucces);
	} else {
		asCore.post(`web/login/verify_mobile`, data, cb)
	}
}
// 修改密码接口 - 
export const reset_password = (data, cb) => {
	if (debug) {
		cb(data.returnSucces);
	} else {
		asCore.post(`web/login/reset_password`, data, cb)
	}
}
// 用户信息接口
export const get_users_info = (data, cb) => {
	if (debug) {
		cb(data.userInfo);
	} else {
		asCore.post(`web/users/get_users_info`, data, cb)
	}
}
// 编辑用户信息接口
export const edit_users_info = (data, cb) => {
	if (debug) {
		cb(data.returnSucces);
	} else {
		asCore.post(`web/users/edit_users_info`, data, cb)
	}
}

// 手机号验证接口 - 修改手机号码
export const verifyMobile = (data, cb) => {
	if (debug) {
		cb(data.returnSucces);
	} else {
		asCore.post(`web/users/verify_mobile`, data, cb)
	}
}

// 修改手机号码
export const editMobile = (data, cb) => {
	if (debug) {
		cb(data.returnSucces);
	} else {
		asCore.post(`web/users/edit_mobile`, data, cb)
	}
}

// 验证邮箱接口 - 
export const verify_email = (data, cb) => {
	if (debug) {
		cb(data.returnSucces);
	} else {
		asCore.post(`web/users/verify_email`, data, cb)
	}
}
// 修改邮箱
export const edit_email = (data, cb) => {
	if (debug) {
		cb(data.returnSucces);
	} else {
		asCore.post(`web/users/edit_email`, data, cb)
	}
}
// 商品列表接口

export const get_goods_list = (data, cb) => {
	if (debug) {
		cb(data.shopList);
	} else {

		asCore.post(`web/goods/get_goods_list`, data, cb)
	}
}
// 商品信息接口
export const get_goods_info = (data, cb) => {
	if (debug) {
		cb(data.shopInfo);
	} else {
		asCore.post(`web/goods/get_goods_info`, data, cb)
	}
}
// 商品参数列表接口
export const get_goods_param = (data, cb) => {
	if (debug) {
		cb(data.shopParam);
	} else {
		asCore.post(`web/goods/get_goods_param`, data, cb)
	}
}
// 商品规格列表接口
export const get_goods_spec = (data, cb) => {
	if (debug) {
		cb(data.shopSpec);
	} else {
		asCore.post(`web/goods/get_goods_spec`, data, cb)
	}
}
// 商品规格属性价格接口
export const get_goods_option = (data, cb) => {
	if (debug) {
		cb(data.shopSpecPrice);
	} else {
		asCore.post(`web/goods/get_goods_option`, data, cb)
	}
}
// 商品类型列表接口 - 根据上级id查询类型列表
export const get_category_list = (data, cb) => {
	if (debug) {
		cb(data.categoryType);
	} else {
		asCore.post(`web/goods/get_category_list`, data, cb)
	}
}
// 所有商品类型列表接口
export const get_all_category_list = (data, cb) => {
	if (debug) {
		cb(data.categoryTypeList);
	} else {
		asCore.post(`web/goods/get_all_category_list`, data, cb)
	}
}
// 添加商品收藏接口
export const add_goods_collection = (data, cb) => {
	if (debug) {
		cb(data.returnSucces);
	} else {
		asCore.post(`zdapp/goods_collection/add_goods_collection`, data, cb)
	}
}
// 积分记录列表接口 - 根据村排列 前4个商品
export const get_collection_List = (data, cb) => {
	if (debug) {
		cb(data.collectionList);
	} else {
		asCore.post(`zdapp/goods_collection/get_collection_List`, data, cb)
	}
}
// 商品收藏列表接口 - 根据村id查询所有收藏商品
export const get_goods_collection_List = (data, cb) => {
	if (debug) {
		cb(data.collectionListGood);
	} else {
		asCore.post(`zdapp/goods_collection/get_goods_collection_List`, data, cb)
	}
}

// 删除商品收藏接口
export const del_goods_collection = (data, cb) => {
	if (debug) {
		cb(data.returnSucces);
	} else {
		asCore.post(`zdapp/goods_collection/del_goods_collection`, data, cb)
	}
}
// 用户发布二手商品 - 
export const add_twohand_goods = (data, cb) => {
	if (debug) {
		cb(data.returnSucces);
	} else {
		asCore.post(`web/goods/add_twohand_goods`, data, cb)
	}
}
// 用户编辑二手商品 - 
export const edit_twohand_goods = (data, cb) => {
	if (debug) {
		cb(data.returnSucces);
	} else {
		asCore.post(`web/goods/edit_twohand_goods`, data, cb)
	}
}
// 下架
export const lower_twohand_goods = (data, cb) => {
	if (debug) {
		cb(data.returnSucces);
	} else {
		asCore.post(`web/goods/lower_twohand_goods`, data, cb)
	}
}

//用户二手商品删除接口
export const del_twohand_goods = (data, cb) => {
	if (debug) {
		cb(data.returnSucces);
	} else {
		asCore.post(`web/goods/del_twohand_goods`, data, cb)
	}
}
// 用户二手商品数量接口
export const get_goods_count = (data, cb) => {
	if (debug) {
		cb(data.goodCount);
	} else {
		asCore.post(`web/goods/get_goods_count`, data, cb)
	}
}
// banner图列表接口
export const get_banner_list = (data, cb) => {
	if (debug) {
		cb(data.bannerList);
	} else {

		asCore.post(`web/banner/get_banner_list`, data, cb)
	}
}
// 地址列表接口
export const get_address_list = (data, cb) => {
	if (debug) {
		cb(data.addressList);
	} else {

		asCore.post(`web/address/get_address_list`, data, cb)
	}
}
// 地址详情接口
export const get_address_info = (data, cb) => {
	if (debug) {
		cb(data.addressDetail);
	} else {


		asCore.post(`web/address/get_address_info`, data, cb)
	}
}
// 添加地址接口
export const add_address_info = (data, cb) => {
	if (debug) {
		cb(data.returnSucces);
	} else {
		asCore.post(`web/address/add_address_info`, data, cb)
	}
}
// 修改地址接口
export const edit_address_info = (data, cb) => {
	if (debug) {
		cb(data.returnSucces);
	} else {
		asCore.post(`web/address/edit_address_info`, data, cb)
	}
}
// 删除地址接口
export const del_address_info = (data, cb) => {
	if (debug) {
		cb(data.returnSucces);
	} else {
		asCore.post(`web/address/del_address_info`, data, cb)
	}
}
// 用户优惠券列表接口
export const get_users_coupon_list = (data, cb) => {
	if (debug) {
		cb(data.coupon_list);
	} else {
		asCore.post(`web/coupon/get_users_coupon_list`, data, cb)
	}
}
// 加入购物车接口
export const add_order_info = (data, cb) => {
	if (debug) {
		cb(data.returnSucces);
	} else {
		asCore.post(`web/cart/add_order_info`, data, cb)
	}
}
// 购物车数量接口
export const get_order_num = (data, cb) => {
	if (debug) {
		cb({
			"code": 200,
			"message": "获取信息成功！",
			"data": {
				"number": 7
			}
		});
	} else {
		asCore.post(`web/cart/get_order_num`, data, cb)
	}
}
// 购物车列表接口
export const get_order_list = (data, cb) => {
	if (debug) {
		cb(data.cartList);
	} else {
		asCore.post(`web/cart/get_order_list`, data, cb)
	}
}
// 购物车总价接口
export const get_order_price = (data, cb) => {
	if (debug) {
		cb({
			"code": 200,
			"message": "获取信息成功！",
			"data": {
				"total_price": 2.06
			}
		});
	} else {
		asCore.post(`web/cart/get_order_price`, data, cb)
	}
}
// 增减购物车数量接口
export const update_order_num = (data, cb) => {
	if (debug) {
		cb(data.addNum);
	} else {
		asCore.post(`web/cart/update_order_num`, data, cb)
	}
}
// 删除购物车接口
export const del_order_info = (data, cb) => {
	if (debug) {
		cb(data.returnSucces);
	} else {
		asCore.post(`web/cart/del_order_info`, data, cb)
	}
}
export const get_orderConfirm = (data, cb) => {
	if (debug) {
		cb(data.orderConfirm);
	} else {
		asCore.post(`web/order_pay/get_order_confirm`, data, cb)
	}
}
export const get_order_pay = (data, cb) => {
	if (debug) {
		cb(data.orderPay);
	} else {
		asCore.post(`web/web/order_pay/get_order_pay`, data, cb)
	}
}
// pay_balance
export const pay_balance = (data, cb) => {
	if (debug) {
		cb(data.returnSucces);
	} else {
		asCore.post(`zdapp/pay/pay_balance`, data, cb)
	}
}
// 支付配置接口
export const get_set = (data, cb) => {
	if (debug) {
		cb(data.paySet);
	} else {
		asCore.post(`zdapp/pay/get_set`, data, cb)
	}
}
// h5微信支付接口
export const pay_h5wx = (data, cb) => {
	if (debug) {
		cb(data.returnSucces);
	} else {
		asCore.post(`zdapp/pay/pay_h5wx`, data, cb)
	}
}
// 微信支付接口 - 微信内支付 小程序 公众号 （暂未调试）
export const pay_wxapp = (data, cb) => {
	if (debug) {
		cb(data.returnSucces);
	} else {
		asCore.post(`zdapp/pay/pay_wxapp`, data, cb)
	}
}
// 支付宝支付接口 - md5验证支付
export const pay_alipay = (data, cb) => {
	if (debug) {
		cb(data.returnSucces);
	} else {
		asCore.post(`zdapp/pay/pay_alipay`, data, cb)
	}
}
// 支付宝WAP支付接口
export const pay_alipay_h5 = (data, cb) => {
	if (debug) {
		cb(data.returnSucces);
	} else {
		asCore.post(`zdapp/pay/pay_alipay_h5`, data, cb)
	}
}
// 订单列表接口
export const get_order_co_list = (state, cb) => {
	if (debug) {
		cb(data.orderList);
	} else {
		asCore.post(`web/order/get_order_co_list`, state, cb)
	}
}

// 订单详情接口
export const get_order_co_info = (data, cb) => {
	if (debug) {
		cb(data.orderDetail);
	} else {

		asCore.post(`web/order/get_order_co_info`, data, cb)
	}
}
// 点击收货接口
export const co_order_take = (data, cb) => {
	if (debug) {
		cb(data.returnSucces);
	} else {
		asCore.post(`web/order/co_order_take`, data, cb)
	}
}
// 取消订单接口
export const del_order_co = (data, cb) => {
	if (debug) {
		cb(data.returnSucces);
	} else {
		asCore.post(`web/order/del_order_co`, data, cb)
	}
}
// 商品订单详情接口
export const get_order_info = (data, cb) => {
	if (debug) {
		cb(data.orderInfo);
	} else {
		asCore.post(`web/order/get_order_info`, data, cb)
	}
}
// 待支付订单修改地址接口
export const co_order_edit_address = (data, cb) => {
	if (debug) {
		cb(data.returnSucces);
	} else {
		asCore.post(`web/order/co_order_edit_address`, data, cb)
	}
}
// 退货订单详情接口
export const get_refund_info = (data, cb) => {
	if (debug) {
		cb(data.returnOrderInfo);
	} else {
		asCore.post(`web/users_order/get_refund_info`, data, cb)
	}
}
// 申请退货接口
export const add_refund = (data, cb) => {
	if (debug) {
		cb(data.returnSucces);
	} else {
		asCore.post(`web/order_refund/add_refund`, data, cb)
	}
}
// 添加快递号接口
export const add_refund_tracking = (data, cb) => {
	if (debug) {
		cb(data.returnSucces);
	} else {
		asCore.post(`web/order_refund/add_refund_tracking`, data, cb)
	}
}
// 卖家拒绝退款申请接口
export const co_refund_refuse = (data, cb) => {
	if (debug) {
		cb(data.returnSucces);
	} else {
		asCore.post(`web/order_refund/co_refund_refuse`, data, cb)
	}
}
// 取消退货申请接口
export const del_refund_info = (data, cb) => {
	if (debug) {
		cb(data.returnSucces);
	} else {
		asCore.post(`web/order_refund/del_refund_info`, data, cb)
	}
}
// 买家换货收货接口
export const co_refund_take = (data, cb) => {
	if (debug) {
		cb(data.returnSucces);
	} else {
		asCore.post(`web/order_refund/co_refund_take`, data, cb)
	}
}

// 卖家订单列表接口
export const get_order_coList = (data, cb) => {
	if (debug) {
		cb(data.coOrderList);
	} else {
		asCore.post(`web/users_order/get_order_co_list`, data, cb)
	}
}
// 订单详情接口
export const get_order_coInfo = (data, cb) => {
	if (debug) {
		cb(data.coOrderDetail);
	} else {
		asCore.post(`web/users_order/get_order_co_info`, data, cb)
	}
}
// 卖家发货接口 - 添加快递号

export const add_tracking = (data, cb) => {
	if (debug) {
		cb(data.returnSucces);
	} else {
		asCore.post(`web/users_order/add_tracking`, data, cb)
	}
}
// 删除订单接口

export const del_orderCo = (data, cb) => {
	if (debug) {
		cb(data.returnSucces);
	} else {
		asCore.post(`web/users_order/del_order_co`, data, cb)
	}
}

// 退货订单列表接口

export const get_refund_list = (data, cb) => {
	if (debug) {
		cb(data.coReList);
	} else {
		asCore.post(`web/users_order/get_refund_list`, data, cb)
	}
}


// 商家同意退款申请接口

export const co_refund_agree = (data, cb) => {
	if (debug) {
		cb(data.returnSucces);
	} else {
		asCore.post(`web/users_order/co_refund_agree`, data, cb)
	}
}
// 退货订单卖家收货接口 
export const co_refundTake = (data, cb) => {
	if (debug) {
		cb(data.returnSucces);
	} else {
		asCore.post(`web/users_order/co_refund_take`, data, cb)
	}

}

// 卖家换货发货接口 - 添加快递号

export const add_refundTracking = (data, cb) => {
	if (debug) {
		cb(data.returnSucces);
	} else {
		asCore.post(`web/users_order/add_refund_tracking`, data, cb)
	}
}

// 添加评价接口
export const add_evaluation = (data, cb) => {
	if (debug) {
		cb(data.returnSucces);
	} else {
		asCore.post(`web/evaluation/add_evaluation`, data, cb)
	}
}
// 商品评价数量接口
export const get_evaluation_count = (data, cb) => {
	if (debug) {
		cb(data.evaluation_count);
	} else {
		asCore.post(`web/evaluation/get_evaluation_count`, data, cb)
	}
}
// 商品评价列表接口
export const get_evaluation_list = (data, cb) => {
	if (debug) {
		cb(data.evaluationList);
	} else {
		asCore.post(`web/evaluation/get_evaluation_list`, data, cb)
	}
}

// 活动商品列表接口 - 秒杀和一元商品
export const get_goodsList = (data, cb) => {
	if (debug) {
		cb(data.goods_list);
	} else {
		asCore.post(`web/activity_goods/get_goods_list`, data, cb)
	}
}

// 活动商品信息接口
export const get_goodsInfo = (data, cb) => {
	if (debug) {
		cb(data.goodsInfo);
	} else {

		asCore.post(`web/activity_goods/get_goods_info`, data, cb)
	}
}


// 订单确认接口
export const get_order_confirm = (data, cb) => {
	if (debug) {
		cb(data.orderConfirm);
	} else {
		asCore.post(`web/activity_order_pay/get_order_confirm`, data, cb)
	}
}
// 支付订单接口

export const get_orderPay = (data, cb) => {
	if (debug) {
		cb(data.orderPay);
	} else {
		asCore.post(`web/activity_order_pay/get_order_pay`, data, cb)
	}
}

// 订单列表接口
export const get_orderLlist = (data, cb) => {
	if (debug) {
		cb(data.activity_order);
	} else {
		asCore.post(`web/activity_order/get_order_list`, data, cb)
	}
}

// 订单列表接口
export const get_orderInfo = (data, cb) => {

	if (debug) {
		cb(data.activity_Detail);
	} else {
		asCore.post(`web/activity_order/get_order_info`, data, cb)
	}
}

// 点击收货接口
export const orderTake = (data, cb) => {
	if (debug) {
		cb(data.returnSucces);
	} else {
		asCore.post(`web/activity_order/order_take`, data, cb)
	}
}
// 取消订单接口
export const delOrder = (data, cb) => {
	if (debug) {
		cb(data.returnSucces);
	} else {
		asCore.post(`web/activity_order/del_order`, data, cb)
	}
}
// 修改地址接口
export const order_editAddress = (data, cb) => {
	if (debug) {
		cb(data.returnSucces);
	} else {
		asCore.post(`web/activity_order/order_edit_address`, data, cb)
	}
}
//添加评价接口
export const addEvaluation = (data, cb) => {
	if (debug) {
		cb(data.returnSucces);
	} else {
		asCore.post(`web/activity_evaluation/add_evaluation`, data, cb)
	}
}
//商品评价数量接口
export const get_evaluationCount = (data, cb) => {
	if (debug) {
		cb(data.evaluation_count);
	} else {
		asCore.post(`web/activity_evaluation/get_evaluation_count`, data, cb)
	}
}
//商品评价列表接口
export const get_evaluationList = (data, cb) => {
	if (debug) {
		cb(data.evaluationList);
	} else {
		asCore.post(`web/activity_evaluation/get_evaluation_list`, data, cb)
	}
}
//申请退货接口
export const addRefund = (data, cb) => {
	if (debug) {
		cb(data.returnSucces);
	} else {
		asCore.post(`web/activity_refund/add_refund`, data, cb)
	}
}
// 退货订单详情接口
export const get_refund_Info = (data, cb) => {
	if (debug) {
		cb(data.refund_info);
	} else {
		asCore.post(`web/activity_refund/get_refund_info`, data, cb)
	}
}
// 添加快递号接口
export const addRefundTracking = (data, cb) => {
	if (debug) {
		cb(data.returnSucces);
	} else {
		asCore.post(`web/activity_refund/add_refund_tracking`, data, cb)
	}
}
// 取消退货申请接口
export const del_refundInfo = (data, cb) => {
	if (debug) {
		cb(data.returnSucces);
	} else {
		asCore.post(`web/activity_refund/del_refund_info`, data, cb)
	}
}
// 买家换货收货接口
export const coRefund_take = (data, cb) => {
	if (debug) {
		cb(data.returnSucces);
	} else {
		asCore.post(`web/activity_refund/co_refund_take`, data, cb)
	}
}

// 抽奖页面接口
export const coRefundTake = (data, cb) => {
	if (debug) {
		cb(data.raffle_info);
	} else {
		asCore.post(`web/raffle/get_raffle_info`, data, cb)
	}
}

// 抽奖页面接口点击抽奖
export const raffle = (data, cb) => {
	if (debug) {
		cb(data.raffleRes);
	} else {
		asCore.post(`web/raffle/raffle`, data, cb)
	}
}

// 用户奖品列表接口
export const get_users_raffle_list = (data, cb) => {
	if (debug) {
		cb(data.raffleList);
	} else {
		asCore.post(`web/raffle/get_users_raffle_list`, data, cb)
	}
}

// 活动中奖列表接口
export const get_raffle_list = (data, cb) => {
	if (debug) {
		cb(data.raffle_list);
	} else {
		asCore.post(`web/raffle/get_raffle_list`, data, cb)
	}
}
