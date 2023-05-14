import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'; 

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  categories: string[] = [
    'Non-veg',
    'Veg',
    'Starters',
    'Chaat Items',
    'Sweets',
    'Juices'
  ];

  foodForm !: FormGroup;

  constructor(private formBuilder : FormBuilder,
     private api : ApiService,
    private dialogRef : MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.foodForm = this.formBuilder.group({
      foodName : ['', Validators.required],
      category : ['', Validators.required],
      description : ['',Validators.required],
      price : ['',Validators.required],
      date : ['',Validators.required]
    });

    // if(this.editData){
    //   this.foodForm.controls['foodName'].setValue(this.editData.foodName);
    //   this.foodForm.controls['category'].setValue(this.editData.category);
    //   this.foodForm.controls['description'].setValue(this.editData.description);
    //   this.foodForm.controls['price'].setValue(this.editData.price);
    //   this.foodForm.controls['date'].setValue(this.editData.date);
    // }

  }

  addFood(){
    if(this.foodForm.valid){
      this.api.postProduct(this.foodForm.value)
      .subscribe({
        next:(res)=>{
          alert("Food item added successfully");
          this.foodForm.reset();
          this.dialogRef.close('save');
        },
        error:()=>{
          alert("Error while adding the food item")
        }
      })
    }
  }



}
