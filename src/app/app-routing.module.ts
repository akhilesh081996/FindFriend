import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  { path: 'signin', loadChildren: './signin/signin.module#SigninPageModule' },
  { path: 'login', loadChildren: './signin/signin.module#SigninPageModule' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'signup', loadChildren: './signup/signup.module#SignupPageModule' },
  { path: 'forgot', loadChildren: './forgot/forgot.module#ForgotPageModule' },
  { path: 'shop', loadChildren: './shop/shop.module#ShopPageModule' },
  { path: 'shop/:service_id', loadChildren: './shop/shop.module#ShopPageModule' },
  { path: 'shop_search/:q', loadChildren: './shop/shop.module#ShopPageModule' },
  { path: 'shop_search', loadChildren: './shop/shop.module#ShopPageModule' },
  { path: 'barbors', loadChildren: './barbors/barbors.module#BarborsPageModule' },
  { path: 'appointments/:user_id', loadChildren: './appointments/appointments.module#AppointmentsPageModule' },
  { path: 'messages', loadChildren: './messages/messages.module#MessagesPageModule' },
  // { path: 'askquestion', loadChildren: './askquestion/askquestion.module#AskquestionPageModule' }
  { path: 'contact', loadChildren: './contact/contact.module#ContactPageModule' },
  { path: 'news', loadChildren: './news/news.module#NewsPageModule' },
  { path: 'aboutshop', loadChildren: './aboutshop/aboutshop.module#AboutshopPageModule' },
  { path: 'userprofile', loadChildren: './userprofile/userprofile.module#UserprofilePageModule' },
  { path: 'userprofile/:user_id/:type', loadChildren: './userprofile/userprofile.module#UserprofilePageModule' },
  { path: 'about', loadChildren: './about/about.module#AboutPageModule' },
  { path: 'addupload', loadChildren: './addupload/addupload.module#AdduploadPageModule' },
  { path: 'barbercontactinfo', loadChildren: './barbercontactinfo/barbercontactinfo.module#BarbercontactinfoPageModule' },
  { path: 'barberprofile', loadChildren: './barberprofile/barberprofile.module#BarberprofilePageModule' },
  // { path: 'barberprofile/:user_id/:type', loadChildren: './barberprofile/barberprofile.module#BarberprofilePageModule' },
  { path: 'invoice', loadChildren: './invoice/invoice.module#InvoicePageModule' },
  { path: 'invoice/:user_id', loadChildren: './invoice/invoice.module#InvoicePageModule' },
  { path: 'chat', loadChildren: './chat/chat.module#ChatPageModule' },
  { path: 'booking', loadChildren: './booking/booking.module#BookingPageModule' },
  { path: 'booking2', loadChildren: './booking2/booking2.module#Booking2PageModule' },
  { path: 'booking2/:booking_id', loadChildren: './booking2/booking2.module#Booking2PageModule' },
  { path: 'nearby', loadChildren: './nearby/nearby.module#NearbyPageModule' },
  { path: 'services', loadChildren: './services/services.module#ServicesPageModule' },
  { path: 'searchfilter', loadChildren: './searchfilter/searchfilter.module#SearchfilterPageModule' },
  { path: 'managebankcards', loadChildren: './managebankcards/managebankcards.module#ManagebankcardsPageModule' },
  { path: 'choosetype', loadChildren: './choosetype/choosetype.module#ChoosetypePageModule' },
  { path: 'billing', loadChildren: './billing/billing.module#BillingPageModule' },
  { path: 'billing/:type', loadChildren: './billing/billing.module#BillingPageModule' },
  { path: 'billing/:type/:page', loadChildren: './billing/billing.module#BillingPageModule' },
  { path: 'thankyou', loadChildren: './thankyou/thankyou.module#ThankyouPageModule' },
  { path: 'gallery-custom-modal', loadChildren: './gallery-custom-modal/gallery-custom-modal.module#GalleryCustomModalPageModule' },
  { path: 'cardinfo', loadChildren: './cardinfo/cardinfo.module#CardinfoPageModule' },
  { path: 'billingedit/:type/:card_id/:card_last4/:card_brand/:card_exp_month/:card_exp_year/:card_name/edit/:default', loadChildren: './billingedit/billingedit.module#BillingeditPageModule' },
  { path: 'singlefeed/:id', loadChildren: './singlefeed/singlefeed.module#SinglefeedPageModule' },
  { path: 'notifications', loadChildren: './notifications/notifications.module#NotificationsPageModule' },
  { path: 'trainer/:user_id/:type' , loadChildren: './trainer/trainer.module#TrainerPageModule' },
  { path: 'newusercontact', loadChildren: './newusercontact/newusercontact.module#NewusercontactPageModule' },
  { path: 'interest', loadChildren: './interest/interest.module#InterestPageModule' },
  { path: 'userupload', loadChildren: './userupload/userupload.module#UseruploadPageModule' },
  { path: 'newuserabout', loadChildren: './newuserabout/newuserabout.module#NewuseraboutPageModule' },
  { path: 'usercertification', loadChildren: './usercertification/usercertification.module#UsercertificationPageModule' },
  { path: 'searchlist', loadChildren: './searchlist/searchlist.module#SearchlistPageModule' },
  { path: 'reviewrating', loadChildren: './reviewrating/reviewrating.module#ReviewratingPageModule' },
  { path: 'addnewcard', loadChildren: './addnewcard/addnewcard.module#AddnewcardPageModule' },
  { path: 'carddetails', loadChildren: './carddetails/carddetails.module#CarddetailsPageModule' },
  { path: 'schedule', loadChildren: './schedule/schedule.module#SchedulePageModule' },
  { path: 'changepassword', loadChildren: './changepassword/changepassword.module#ChangepasswordPageModule' },
  { path: 'updateuser', loadChildren: './updateuser/updateuser.module#UpdateuserPageModule' },
  { path: 'myprofile', loadChildren: './myprofile/myprofile.module#MyprofilePageModule' },
  { path: 'otheruser', loadChildren: './otheruser/otheruser.module#OtheruserPageModule' },
  { path: 'bankinginformation', loadChildren: './bankinginformation/bankinginformation.module#BankinginformationPageModule' },
  { path: 'myservicesadd', loadChildren: './myservicesadd/myservicesadd.module#MyservicesaddPageModule' },
  { path: 'favfriend', loadChildren: './favfriend/favfriend.module#FavfriendPageModule' },
  { path: 'term', loadChildren: './term/term.module#TermPageModule' },
  { path: 'userreview/:id', loadChildren: './userreview/userreview.module#UserreviewPageModule' },
  { path: 'paypal', loadChildren: './paypal/paypal.module#PaypalPageModule' },
  { path: 'makepayment', loadChildren: './makepayment/makepayment.module#MakepaymentPageModule' },
  { path: 'availability/:user_id/:type', loadChildren: './availability/availability.module#AvailabilityPageModule' },
  { path: 'instruction', loadChildren: './instruction/instruction.module#InstructionPageModule' },
  { path: 'setschedule/:act/:id', loadChildren: './setschedule/setschedule.module#SetschedulePageModule' },
  { path: 'checkavailability/:user_id/:type', loadChildren: './checkavailability/checkavailability.module#CheckavailabilityPageModule' },
  { path: 'rateexperience', loadChildren: './rateexperience/rateexperience.module#RateexperiencePageModule' },
  { path: 'profileandactivity', loadChildren: './profileandactivity/profileandactivity.module#ProfileandactivityPageModule' },
  { path: 'chosehome', loadChildren: './chosehome/chosehome.module#ChosehomePageModule' },
  { path: 'findhomee', loadChildren: './findhomee/findhomee.module#FindhomeePageModule' },
  { path: 'seheduletime', loadChildren: './seheduletime/seheduletime.module#SeheduletimePageModule' },
  { path: 'kyc', loadChildren: './kyc/kyc.module#KycPageModule' },
  { path: 'addbank', loadChildren: './addbank/addbank.module#AddbankPageModule' },
  { path: 'banks', loadChildren: './banks/banks.module#BanksPageModule' },
  { path: 'editkyc', loadChildren: './editkyc/editkyc.module#EditkycPageModule' },






];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
