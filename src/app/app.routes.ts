import { Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { PostpetComponent } from './component/postpet/postpet.component';
import { MyprofileComponent } from './component/myprofile/myprofile.component';
import { MypetComponent } from './component/mypet/mypet.component';
import { MypetrequestComponent } from './component/mypetrequest/mypetrequest.component';
import { RequestedpetComponent } from './component/requestedpet/requestedpet.component';
import { AdminComponent } from './component/admin/admin.component';
import { LandingComponent } from './component/landing/landing.component';
import { HomeComponent } from './component/home/home.component';
import { Component } from '@angular/core';
import { PetListComponent } from './component/pet-list/pet-list.component';
import { EditPetComponent } from './component/edit-pet/edit-pet.component';
import { PetDetailsComponent } from './component/pet-details/pet-details.component';
import { authGuard } from './component/admin/auth.guard';
import { ProfileComponent } from './component/profile/profile.component';
import { ManagePetComponent } from './component/ManagePet/ManagePet.component';
import { UserComponent } from './component/admin/user/user.component';

export const routes: Routes = [
    {path:"",component:LandingComponent},
    {path:"navbar",component:NavbarComponent},
    {path:"home",component:HomeComponent, children:[
       {path:"", component:PetListComponent},
       {path:"pet-details/:id", component:PetDetailsComponent},
       {path:"login", component:LoginComponent},
       {path:"profile", component:ProfileComponent},
       {path:"postpet",component:PostpetComponent},
       {path:"register",component:RegisterComponent},
       {path:"myprofile",component:MyprofileComponent},
       {path:"mypet",component:MypetComponent},
       {path:"editpet/:id",component:EditPetComponent},
       {path:"mypetreq",component:MypetrequestComponent},
       {path:"ireq",component:RequestedpetComponent},
       {path:"managePet",component:ManagePetComponent},
      
    ]},
    {path:"admin",component:AdminComponent, canActivate: [authGuard], children:[ 
        {path:"user",component:UserComponent},
        {path:"pet",component:UserComponent},
        {path:"request",component:UserComponent}
    ] }
];
