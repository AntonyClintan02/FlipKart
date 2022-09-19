import { AdminComponent } from './Components/user/admin/admin.component';
import { ProductsComponent } from './Components/products/products.component';
import { DefaultPageComponent } from './Components/default-page/default-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './Components/cart/cart.component';


const routes: Routes = [
 
    { path: "",component: DefaultPageComponent},
    { path: "products",component: ProductsComponent},
    { path: "cart",component: CartComponent},
    { path: "admin",component : AdminComponent}
    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

