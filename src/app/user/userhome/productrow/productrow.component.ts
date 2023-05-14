import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { product } from 'src/app/models/types';
import { ApiService } from 'src/app/services/api.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-productrow',
  templateUrl: './productrow.component.html',
  styleUrls: ['./productrow.component.css']
})
export class ProductrowComponent implements OnInit {
  public productList:any;
  @Input() products:any[]=[];
  @Input() producttitle:string="";
  selected: string = "All";
  types=[
    "All",
    "Non-veg",
    "Veg",
    "Starters",
    "Chaat Items",
    "Sweets",
    "Juices"
  ]


  constructor(public router:Router,public route:ActivatedRoute, private api:ApiService,private cartService:CartService) { }

  ngOnInit(): void { 
    this.api.getProduct()
    .subscribe(res=>{
      this.products = res;


      this.products.forEach((a:any)=>{
        Object.assign(a,{quantity:1,total:a.price})
      });
    })
  }

  addtoCart(item:any){
    this.cartService.addtoCart(item);
  }


  changeRoute(current:product){
    alert("event firing")
    this.router.navigate(['details'],{relativeTo:this.route,state:current});
  }

}