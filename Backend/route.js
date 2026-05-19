const express=require('express')
const Controller=require('./Controller/controller.js')
const{auth,isProvider}=require('./Middleware/autho.js')
const{trackUsage,getUsage}=require('./Controller/usage.js')
const {apiKeyAutho}=require('./Middleware/apiKey.js')
const{handleDynamicAPI}=require('./Controller/DynamicApi.js')
const{createPlan}=require('./Controller/PlanController.js')
const{subscribe,upgradePlan}=require('./Controller/Subscription.js')
const{getProviderEarnings}=require('./Controller/getProviderEarning.js')
const{getAdminRevenue}=require('./Controller/AdminEarning.js')
const API= require('./Modal/apimodal.js');
const Subscription= require('./Modal/Subscription.js');
const Transaction= require('./Modal/TransectionModel.js');
const{getProviderDashboard}=require('./Controller/providerDahboard.js')
const{updateAPI}=require('./Controller/ApiUpdateController.js')
const{deleteAPI}=require('./Controller/DeleteApi.js')
const{enableAPI}=require('./Controller/EnableApi.js')
const{getProviderApis}=require('./Controller/PanPlusApi.js')
const{updatePlan}=require('./Controller/UpdatePlan.js')
const {getMySubscriptions}=require('./Controller/ShowSubscriptions.js')
const{getUsageAnalytics}=require('./Controller/GetAnalytics.js')
const {changePassword}=require('./Controller/ChangePassword.js')
const { createAdmin, adminLogin } = require('./Controller/AdminController');
const { getAdminDashboard } = require("./Controller/AdminDashboard.js");
const adminAuth = require("./Middleware/AdminAuth.js");
const{blockProvider,unblockProvider}=require('./Controller/BlockAndUnblockProvider.js')
const {getAllProviders}=require('./Controller/GetProviderPaln.js')
const { getAllConsumers } = require("./Controller/AdminCosumer.js");
const{getActivity}=require('./Controller/ActivityController.js')
const{blockConsumer,unblockConsumer}=require('./Controller/BlockandUnblockCosumer.js')
const{submitKyc}=require('./Controller/ProviderKycController.js')
const{createOrder}=require('./Controller/PaymentController.js')
const{createRazorpayAccount}=require('./Controller/RozarpayAccount.js')
const{verifyPayment}=require('./Controller/verifyPayment.js')
const{getProviderDashboardall}=require('./Controller/ProviderFinalDshboard.js')
const{getAdminFinanceDashboard}=require('./Controller/AdminFinaceEarning.js')
const{requestWithdrawal}=require('./Controller/RequestWithrawal.js')
const{approveWithdrawal}=require('./Controller/ApproveWithdrawal.js')
const{getAllWithdrawals}=require('./Controller/GetallWithrawall.js')
const{getProviderWithdrawals}=require('./Controller/ProviderWithrawalHistory.js')
const{rejectWithdrawal}=require('./Controller/RejectWithrawal.js')
const{getProviderTransactions}=require('./Controller/GetProviderYransection.js')
const{getProviderBank,updateProviderBank}=require('./Controller/ProviderKYCBank.js')




//creting-route
const route=express.Router()

route.post('/register',Controller.register)
route.post('/login',Controller.login)
route.get('/api',Controller.getAllAPIs)
route.post('/create/api',auth,isProvider,Controller.createAPI)
route.all('/use/:endpoint',apiKeyAutho,trackUsage,handleDynamicAPI)
route.get('/usage',apiKeyAutho,getUsage)
route.post('/createPlan',auth,isProvider,createPlan)
route.post("/subscribe", auth, subscribe);
route.post('/upgrade',auth,upgradePlan)
route.get("/provider/earnings", auth, isProvider, getProviderEarnings);
route.get("/admin/revenue", adminAuth, getAdminRevenue);
route.get('/dashboard/provider',auth,isProvider, getProviderDashboard)
route.put('/updateApi/:id',auth,isProvider,updateAPI)
route.delete('/Inactiveapi/:id',auth,isProvider,deleteAPI)
route.put('/Activeapi/:id',auth,isProvider,enableAPI)
route.get("/provider/apis", auth, isProvider, getProviderApis);
route.put('/plan/:id', auth, isProvider, updatePlan);
route.get('/MySubscriptions',auth,getMySubscriptions)
route.get("/usage-analytics", auth, getUsageAnalytics);
route.post("/change-password", auth, changePassword);
route.post("/adminLogin",adminLogin);
route.get("/admin/dashboard", adminAuth, getAdminDashboard);
route.get("/admin/providers", adminAuth, getAllProviders);
route.put("/admin/provider/block/:id", adminAuth, blockProvider);
route.put("/admin/provider/unblock/:id", adminAuth, unblockProvider);
route.get("/admin/consumers", adminAuth, getAllConsumers);
route.get("/admin/activity", adminAuth, getActivity);
route.put("/admin/consumer/block/:id", adminAuth, blockConsumer);
route.put("/admin/consumer/unblock/:id", adminAuth, unblockConsumer);
route.post("/kyc", auth,isProvider, submitKyc);
route.post('/CreatOrder',auth,createOrder)
route.post('/crateRozarpayAccount',auth,isProvider,createRazorpayAccount)
route.post('/verifypayment',verifyPayment)
route.get('/allproviderDashboard',auth,isProvider,getProviderDashboardall)
route.get('/adminfinace',adminAuth,getAdminFinanceDashboard)
route.post('/requestWithdrawal',auth,isProvider,requestWithdrawal)
route.put('/approve-withdrawal/:id',adminAuth,approveWithdrawal)
route.get('/allWithdrawals',adminAuth,getAllWithdrawals)
route.get('/provider/withdrawals',auth,isProvider,getProviderWithdrawals)
route.put('/reject-withdrawal/:id',adminAuth,rejectWithdrawal)
route.get('/provider/transactions',auth,isProvider,getProviderTransactions)
route.get('/provider/bank',auth,isProvider,getProviderBank)
route.put('/provider/bank',auth,isProvider,updateProviderBank)








//export
module.exports=route