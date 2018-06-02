import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignInOptionsPage } from './sign-in-options';

@NgModule({
  declarations: [
    SignInOptionsPage,
  ],
  imports: [
    IonicPageModule.forChild(SignInOptionsPage),
  ],
})
export class SignInOptionsPageModule {}
