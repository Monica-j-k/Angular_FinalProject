import { Component, OnInit } from '@angular/core';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatTableDataSource} from '@angular/material/table';
import { ProductService } from 'src/app/services/product.service';


export class FoodList{
  id: any;
  foodName!: string;
  category!: string;
  description!: string;
  price!: number;
  date!: Date;
}

@Component({
  selector: 'app-product-grid',
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-grid.component.css']
})

export class ProductGridComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['id', 'foodName', 'category', 'description','date','price','delete'];
  FoodList: FoodList[] = [];
  

  dataSource = new MatTableDataSource<FoodList>([]);

  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  
  constructor(private productService: ProductService,private snackbar: MatSnackBar) { }
  
  ngOnInit(): void {
    this.getFoodList();
  }
  
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  getFoodList(){
    this.productService.getFoodList().subscribe((res) =>{
        this.FoodList = res;
        this.dataSource = new MatTableDataSource<FoodList>(this.FoodList);
        
    })
  }
  removeProductItem(id: any){
    this.productService.deleteProduct(id).subscribe(res =>{
      this.snackbar.open("Food item deleted successfully","Ok",{duration: 3000});
      this.getFoodList();
    });
  }

  applyFilter(event:Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();

    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
    }
  }


}