import asCore from './core'
import data from './data'
const net = weex.requireModule("net");
var debug = true;
// 查询物流上传文件
export const upload = (state, cb) => {
	if (debug) {
		cb(data.returnSucces, true);
	} else {
		net.postFile("http://gj.i2f2f.com/index.php/web/upload/upload", {
				type: state.type
			}, {}, {
				file: state.file
			}, sta => {},
			res => {
				cb(res)
			}, ove => {}, err => {}, true);
	}

}


// 查询物流
export const get_order_express = (state, cb) => {
	if (debug) {
		cb(data.returnExpress, true, true);
	} else {
		asCore.post(`web/order/get_order_express`, state, cb)
	}

}
// 发送验证码接口
export const send_verify = (state, cb) => {
	if (debug) {
		cb(data.returnSucces, true, true);
	} else {
		asCore.post(`web/login/send_verify`, state, cb)
	}

}
// 用户账号登录接口
export const loginWithPw = (state, cb) => {
	if (debug) {
		cb(data.returnLogin, true);
	} else {
		asCore.post(`web/login/index`, state, cb)
	}
}
// 用户验证码登录接口
export const verify_login = (state, cb) => {
	if (debug) {
		cb(data.returnLogin, true);
	} else {
		asCore.post(`web/login/verify_login`, state, cb)
	}
}
// 用户注册接口
export const register = (state, cb) => {
	if (debug) {
		cb(data.returnLogin, true);
	} else {
		asCore.post(`web/login/register`, state, cb)
	}
}
// 绑定手机号接口 - 邮箱注册登录后绑定
export const bind_mobile = (state, cb) => {
	if (debug) {
		cb(data.returnLogin, true, true);
	} else {
		asCore.post(`web/login/bind_mobile`, state, cb)
	}
}
// 修改密码接口 - 有原密码
export const edit_password = (state, cb) => {
	if (debug) {
		cb(data.returnSucces, true);
	} else {
		asCore.post(`web/login/edit_password`, state, cb)
	}
}
// 手机号验证接口 - 手机验证码修改密码
export const verify_mobile = (state, cb) => {
	if (debug) {
		cb(data.returnSucces, true);
	} else {
		asCore.post(`web/login/verify_mobile`, state, cb)
	}
}
// 修改密码接口 - 
export const reset_password = (state, cb) => {
	if (debug) {
		cb(data.returnSucces, true);
	} else {
		asCore.post(`web/login/reset_password`, state, cb)
	}
}
// 用户信息接口
export const get_users_info = (state, cb) => {
	if (debug) {
		cb(data.userInfo, true);
	} else {
		asCore.post(`web/users/get_users_info`, state, cb)
	}
}
// 编辑用户信息接口
export const edit_users_info = (state, cb) => {
	if (debug) {
		cb(data.returnSucces, true);
	} else {
		asCore.post(`web/users/edit_users_info`, state, cb)
	}
}

// 手机号验证接口 - 修改手机号码
export const verifyMobile = (state, cb) => {
	if (debug) {
		cb(data.returnSucces, true);
	} else {
		asCore.post(`web/users/verify_mobile`, state, cb)
	}
}

// 修改手机号码
export const editMobile = (state, cb) => {
	if (debug) {
		cb(data.returnSucces, true);
	} else {
		asCore.post(`web/users/edit_mobile`, state, cb)
	}
}

// 验证邮箱接口 - 
export const verify_email = (state, cb) => {
	if (debug) {
		cb(data.returnSucces, true);
	} else {
		asCore.post(`web/users/verify_email`, state, cb)
	}
}
// 修改邮箱
export const edit_email = (state, cb) => {
	if (debug) {
		cb(data.returnSucces, true);
	} else {
		asCore.post(`web/users/edit_email`, state, cb)
	}
}
// 商品列表接口

export const get_goods_list = (state, cb) => {
	if (debug) {
		cb(data.shopList, true);
	} else {

		asCore.post(`web/goods/get_goods_list`, state, cb)
	}
}
// 商品信息接口
export const get_goods_info = (state, cb) => {
	if (debug) {
		cb(data.shopInfo, true);
	} else {
		asCore.post(`web/goods/get_goods_info`, state, cb)
	}
}
// 商品参数列表接口
export const get_goods_param = (state, cb) => {
	if (debug) {
		cb(data.shopParam, true);
	} else {
		asCore.post(`web/goods/get_goods_param`, state, cb)
	}
}
// 商品规格列表接口
export const get_goods_spec = (state, cb) => {
	if (debug) {
		cb(data.shopSpec, true);
	} else {
		asCore.post(`web/goods/get_goods_spec`, state, cb)
	}
}
// 商品规格属性价格接口
export const get_goods_option = (state, cb) => {
	if (debug) {
		cb(data.shopSpecPrice, true);
	} else {
		asCore.post(`web/goods/get_goods_option`, state, cb)
	}
}
// 商品类型列表接口 - 根据上级id查询类型列表
export const get_category_list = (state, cb) => {
	if (debug) {
		cb(data.categoryType, true);
	} else {
		asCore.post(`web/goods/get_category_list`, state, cb)
	}
}
// 所有商品类型列表接口
export const get_all_category_list = (state, cb) => {
	if (debug) {
		cb(data.categoryTypeList, true);
	} else {
		asCore.post(`web/goods/get_all_category_list`, state, cb)
	}
}
// 添加商品收藏接口
export const add_goods_collection = (state, cb) => {
	if (debug) {
		cb(data.returnSucces, true);
	} else {
		asCore.post(`web/goods_collection/add_goods_collection`, state, cb)
	}
}
// 积分记录列表接口 - 根据村排列 前4个商品
export const get_collection_List = (state, cb) => {
	if (debug) {
		cb(data.collectionList, true);
	} else {
		asCore.post(`zdapp/goods_collection/get_collection_List`, state, cb)
	}
}
// 商品收藏列表接口 - 根据村id查询所有收藏商品
export const get_goods_collection_List = (state, cb) => {
	if (debug) {
		cb(data.collectionListGood, true);
	} else {
		asCore.post(`zdapp/goods_collection/get_goods_collection_List`, state, cb)
	}
}

// 删除商品收藏接口
export const del_goods_collection = (state, cb) => {
	if (debug) {
		cb(data.returnSucces, true);
	} else {
		asCore.post(`web/goods_collection/del_goods_collection`, state, cb)
	}
}
// 用户发布二手商品 - 
export const add_twohand_goods = (state, cb) => {
	if (debug) {
		cb(data.returnSucces, true);
	} else {
		asCore.post(`web/goods/add_twohand_goods`, state, cb)
	}
}
// 用户编辑二手商品 - 
export const edit_twohand_goods = (state, cb) => {
	if (debug) {
		cb(data.returnSucces, true);
	} else {
		asCore.post(`web/goods/edit_twohand_goods`, state, cb)
	}
}
// 下架
export const lower_twohand_goods = (state, cb) => {
	if (debug) {
		cb(data.returnSucces, true);
	} else {
		asCore.post(`web/goods/lower_twohand_goods`, state, cb)
	}
}

//用户二手商品删除接口
export const del_twohand_goods = (state, cb) => {
	if (debug) {
		cb(data.returnSucces, true);
	} else {
		asCore.post(`web/goods/del_twohand_goods`, state, cb)
	}
}
// 用户二手商品数量接口
export const get_goods_count = (state, cb) => {
	if (debug) {
		cb(data.goodCount, true);
	} else {
		asCore.post(`web/goods/get_goods_count`, state, cb)
	}
}
// banner图列表接口
export const get_banner_list = (state, cb) => {
	if (debug) {
		cb(data.bannerList, true);
	} else {

		asCore.post(`web/banner/get_banner_list`, state, cb)
	}
}
// 地址列表接口
export const get_address_list = (state, cb) => {
	if (debug) {
		cb(data.addressList, true);
	} else {

		asCore.post(`web/address/get_address_list`, state, cb)
	}
}
// 地址详情接口
export const get_address_info = (state, cb) => {
	if (debug) {
		cb(data.addressDetail, true);
	} else {


		asCore.post(`web/address/get_address_info`, state, cb)
	}
}
// 添加地址接口
export const add_address_info = (state, cb) => {
	if (debug) {
		cb(data.returnSucces, true);
	} else {
		asCore.post(`web/address/add_address_info`, state, cb)
	}
}
// 修改地址接口
export const edit_address_info = (state, cb) => {
	if (debug) {
		cb(data.returnSucces, true);
	} else {
		asCore.post(`web/address/edit_address_info`, state, cb)
	}
}
// 删除地址接口
export const del_address_info = (state, cb) => {
	if (debug) {
		cb(data.returnSucces, true);
	} else {
		asCore.post(`web/address/del_address_info`, state, cb)
	}
}
// 用户优惠券列表接口
export const get_users_coupon_list = (state, cb) => {
	if (debug) {
		cb(data.coupon_list, true);
	} else {
		asCore.post(`web/coupon/get_users_coupon_list`, state, cb)
	}
}
// 加入购物车接口
export const add_order_info = (state, cb) => {
	if (debug) {
		cb(data.returnSucces, true);
	} else {
		asCore.post(`web/cart/add_order_info`, state, cb)
	}
}
// 购物车数量接口
export const get_order_num = (state, cb) => {
	if (debug) {
		cb({
			"code": 200,
			"message": "获取信息成功！",
			"data": {
				"number": 7
			}
		}, true);
	} else {
		asCore.post(`web/cart/get_order_num`, state, cb)
	}
}
// 购物车列表接口
export const get_order_list = (state, cb) => {
	if (debug) {
		cb(data.cartList, true);
	} else {
		asCore.post(`web/cart/get_order_list`, state, cb)
	}
}
// 购物车总价接口
export const get_order_price = (state, cb) => {
	if (debug) {
		cb({
			"code": 200,
			"message": "获取信息成功！",
			"data": {
				"total_price": 2.06
			}
		}, true);
	} else {
		asCore.post(`web/cart/get_order_price`, state, cb)
	}
}
// 增减购物车数量接口
export const update_order_num = (state, cb) => {
	if (debug) {
		cb(data.addNum, true);
	} else {
		asCore.post(`web/cart/update_order_num`, state, cb)
	}
}
// 删除购物车接口
export const del_order_info = (state, cb) => {
	if (debug) {
		cb(data.returnSucces, true);
	} else {
		asCore.post(`web/cart/del_order_info`, state, cb)
	}
}
export const get_orderConfirm = (state, cb) => {
	if (debug) {
		cb(data.orderConfirm, true);
	} else {
		asCore.post(`web/order_pay/get_order_confirm`, state, cb)
	}
}
export const get_order_pay = (state, cb) => {
	if (debug) {
		cb(data.orderPay, true);
	} else {
		asCore.post(`web/web/order_pay/get_order_pay`, state, cb)
	}
}
// pay_balance
export const pay_balance = (state, cb) => {
	if (debug) {
		cb(data.returnSucces, true);
	} else {
		asCore.post(`zdapp/pay/pay_balance`, state, cb)
	}
}
// 支付配置接口
export const get_set = (state, cb) => {
	if (debug) {
		cb(data.paySet, true);
	} else {
		asCore.post(`zdapp/pay/get_set`, state, cb)
	}
}
// h5微信支付接口
export const pay_h5wx = (state, cb) => {
	if (debug) {
		cb(data.returnSucces, true);
	} else {
		asCore.post(`zdapp/pay/pay_h5wx`, state, cb)
	}
}
// 微信支付接口 - 微信内支付 小程序 公众号 （暂未调试）
export const pay_wxapp = (state, cb) => {
	if (debug) {
		cb(data.returnSucces, true);
	} else {
		asCore.post(`zdapp/pay/pay_wxapp`, state, cb)
	}
}
// 支付宝支付接口 - md5验证支付
export const pay_alipay = (state, cb) => {
	if (debug) {
		cb(data.returnSucces, true);
	} else {
		asCore.post(`zdapp/pay/pay_alipay`, state, cb)
	}
}
// 支付宝WAP支付接口
export const pay_alipay_h5 = (state, cb) => {
	if (debug) {
		cb(data.returnSucces, true);
	} else {
		asCore.post(`zdapp/pay/pay_alipay_h5`, state, cb)
	}
}
// 订单列表接口
export const get_order_co_list = (state, cb) => {
	if (debug) {
		cb(data.orderList, true);
	} else {
		asCore.post(`web/order/get_order_co_list`, state, cb)
	}
}

// 订单详情接口
export const get_order_co_info = (state, cb) => {
	if (debug) {
		cb(data.orderDetail, true);
	} else {

		asCore.post(`web/order/get_order_co_info`, state, cb)
	}
}
// 点击收货接口
export const co_order_take = (state, cb) => {
	if (debug) {
		cb(data.returnSucces, true);
	} else {
		asCore.post(`web/order/co_order_take`, state, cb)
	}
}
// 取消订单接口
export const del_order_co = (state, cb) => {
	if (debug) {
		cb(data.returnSucces, true);
	} else {
		asCore.post(`web/order/del_order_co`, state, cb)
	}
}
// 商品订单详情接口
export const get_order_info = (state, cb) => {
	if (debug) {
		cb(data.orderInfo, true);
	} else {
		asCore.post(`web/order/get_order_info`, state, cb)
	}
}
// 待支付订单修改地址接口
export const co_order_edit_address = (state, cb) => {
	if (debug) {
		cb(data.returnSucces, true);
	} else {
		asCore.post(`web/order/co_order_edit_address`, state, cb)
	}
}
// 退货订单详情接口
export const get_refund_info = (state, cb) => {
	if (debug) {
		cb(data.returnOrderInfo, true);
	} else {
		asCore.post(`web/users_order/get_refund_info`, state, cb)
	}
}
// 申请退货接口
export const add_refund = (state, cb) => {
	if (debug) {
		cb(data.returnSucces, true);
	} else {
		asCore.post(`web/order_refund/add_refund`, state, cb)
	}
}
// 添加快递号接口
export const add_refund_tracking = (state, cb) => {
	if (debug) {
		cb(data.returnSucces, true);
	} else {
		asCore.post(`web/order_refund/add_refund_tracking`, state, cb)
	}
}
// 卖家拒绝退款申请接口
export const co_refund_refuse = (state, cb) => {
	if (debug) {
		cb(data.returnSucces, true);
	} else {
		asCore.post(`web/order_refund/co_refund_refuse`, state, cb)
	}
}
// 取消退货申请接口
export const del_refund_info = (state, cb) => {
	if (debug) {
		cb(data.returnSucces, true);
	} else {
		asCore.post(`web/order_refund/del_refund_info`, state, cb)
	}
}
// 买家换货收货接口
export const co_refund_take = (state, cb) => {
	if (debug) {
		cb(data.returnSucces, true);
	} else {
		asCore.post(`web/order_refund/co_refund_take`, state, cb)
	}
}

// 卖家订单列表接口
export const get_order_coList = (state, cb) => {
	if (debug) {
		cb(data.coOrderList, true);
	} else {
		asCore.post(`web/users_order/get_order_co_list`, state, cb)
	}
}
// 订单详情接口
export const get_order_coInfo = (state, cb) => {
	if (debug) {
		cb(data.coOrderDetail, true);
	} else {
		asCore.post(`web/users_order/get_order_co_info`, state, cb)
	}
}
// 卖家发货接口 - 添加快递号

export const add_tracking = (state, cb) => {
	if (debug) {
		cb(data.returnSucces, true);
	} else {
		asCore.post(`web/users_order/add_tracking`, state, cb)
	}
}
// 删除订单接口

export const del_orderCo = (state, cb) => {
	if (debug) {
		cb(data.returnSucces, true);
	} else {
		asCore.post(`web/users_order/del_order_co`, state, cb)
	}
}

// 退货订单列表接口

export const get_refund_list = (state, cb) => {
	if (debug) {
		cb(data.coReList, true);
	} else {
		asCore.post(`web/users_order/get_refund_list`, state, cb)
	}
}


// 商家同意退款申请接口

export const co_refund_agree = (state, cb) => {
	if (debug) {
		cb(data.returnSucces, true);
	} else {
		asCore.post(`web/users_order/co_refund_agree`, state, cb)
	}
}
// 退货订单卖家收货接口 
export const co_refundTake = (state, cb) => {
	if (debug) {
		cb(data.returnSucces, true);
	} else {
		asCore.post(`web/users_order/co_refund_take`, state, cb)
	}

}

// 卖家换货发货接口 - 添加快递号

export const add_refundTracking = (state, cb) => {
	if (debug) {
		cb(data.returnSucces, true);
	} else {
		asCore.post(`web/users_order/add_refund_tracking`, state, cb)
	}
}

// 添加评价接口
export const add_evaluation = (state, cb) => {
	if (debug) {
		cb(data.returnSucces, true);
	} else {
		asCore.post(`web/evaluation/add_evaluation`, state, cb)
	}
}
// 商品评价数量接口
export const get_evaluation_count = (state, cb) => {
	if (debug) {
		cb(data.evaluation_count, true);
	} else {
		asCore.post(`web/evaluation/get_evaluation_count`, state, cb)
	}
}
// 商品评价列表接口
export const get_evaluation_list = (state, cb) => {
	if (debug) {
		cb(data.evaluationList, true);
	} else {
		asCore.post(`web/evaluation/get_evaluation_list`, state, cb)
	}
}

// 活动商品列表接口 - 秒杀和一元商品
export const get_goodsList = (state, cb) => {
	if (debug) {
		cb(data.goods_list, true);
	} else {
		asCore.post(`web/activity_goods/get_goods_list`, state, cb)
	}
}

// 活动商品信息接口
export const get_goodsInfo = (state, cb) => {
	if (debug) {
		cb(data.goodsInfo, true);
	} else {

		asCore.post(`web/activity_goods/get_goods_info`, state, cb)
	}
}


// 订单确认接口
export const get_order_confirm = (state, cb) => {
	if (debug) {
		cb(data.orderConfirm, true);
	} else {
		asCore.post(`web/activity_order_pay/get_order_confirm`, state, cb)
	}
}
// 支付订单接口

export const get_orderPay = (state, cb) => {
	if (debug) {
		cb(data.orderPay, true);
	} else {
		asCore.post(`web/activity_order_pay/get_order_pay`, state, cb)
	}
}

// 订单列表接口
export const get_orderLlist = (state, cb) => {
	if (debug) {
		cb(data.activity_order, true);
	} else {
		asCore.post(`web/activity_order/get_order_list`, state, cb)
	}
}

// 订单列表接口
export const get_orderInfo = (state, cb) => {

	if (debug) {
		cb(data.activity_Detail, true);
	} else {
		asCore.post(`web/activity_order/get_order_info`, state, cb)
	}
}

// 点击收货接口
export const orderTake = (state, cb) => {
	if (debug) {
		cb(data.returnSucces, true);
	} else {
		asCore.post(`web/activity_order/order_take`, state, cb)
	}
}
// 取消订单接口
export const delOrder = (state, cb) => {
	if (debug) {
		cb(data.returnSucces, true);
	} else {
		asCore.post(`web/activity_order/del_order`, state, cb)
	}
}
// 修改地址接口
export const order_editAddress = (state, cb) => {
	if (debug) {
		cb(data.returnSucces, true);
	} else {
		asCore.post(`web/activity_order/order_edit_address`, state, cb)
	}
}
//添加评价接口
export const addEvaluation = (state, cb) => {
	if (debug) {
		cb(data.returnSucces, true);
	} else {
		asCore.post(`web/activity_evaluation/add_evaluation`, state, cb)
	}
}
//商品评价数量接口
export const get_evaluationCount = (state, cb) => {
	if (debug) {
		cb(data.evaluation_count, true);
	} else {
		asCore.post(`web/activity_evaluation/get_evaluation_count`, state, cb)
	}
}
//商品评价列表接口
export const get_evaluationList = (state, cb) => {
	if (debug) {
		cb(data.evaluationList, true);
	} else {
		asCore.post(`web/activity_evaluation/get_evaluation_list`, state, cb)
	}
}
//申请退货接口
export const addRefund = (state, cb) => {
	if (debug) {
		cb(data.returnSucces, true);
	} else {
		asCore.post(`web/activity_refund/add_refund`, state, cb)
	}
}
// 退货订单详情接口
export const get_refund_Info = (state, cb) => {
	if (debug) {
		cb(data.refund_info, true);
	} else {
		asCore.post(`web/activity_refund/get_refund_info`, state, cb)
	}
}
// 添加快递号接口
export const addRefundTracking = (state, cb) => {
	if (debug) {
		cb(data.returnSucces, true);
	} else {
		asCore.post(`web/activity_refund/add_refund_tracking`, state, cb)
	}
}
// 取消退货申请接口
export const del_refundInfo = (state, cb) => {
	if (debug) {
		cb(data.returnSucces, true);
	} else {
		asCore.post(`web/activity_refund/del_refund_info`, state, cb)
	}
}
// 买家换货收货接口
export const coRefund_take = (state, cb) => {
	if (debug) {
		cb(data.returnSucces, true);
	} else {
		asCore.post(`web/activity_refund/co_refund_take`, state, cb)
	}
}

// 抽奖页面接口
export const coRefundTake = (state, cb) => {
	if (debug) {
		cb(data.raffle_info, true);
	} else {
		asCore.post(`web/raffle/get_raffle_info`, state, cb)
	}
}

// 抽奖页面接口点击抽奖
export const raffle = (state, cb) => {
	if (debug) {
		cb(data.raffleRes, true);
	} else {
		asCore.post(`web/raffle/raffle`, state, cb)
	}
}

// 用户奖品列表接口
export const get_users_raffle_list = (state, cb) => {
	if (debug) {
		cb(data.raffleList, true);
	} else {
		asCore.post(`web/raffle/get_users_raffle_list`, state, cb)
	}
}

// 活动中奖列表接口
export const get_raffle_list = (state, cb) => {
	if (debug) {
		cb(data.raffle_list, true);
	} else {
		asCore.post(`web/raffle/get_raffle_list`, state, cb)
	}
}
