import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef ,MAT_DIALOG_DATA }  from '@angular/material/dialog'

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {


  freshnessList =["Brand New", "Second Hand" , "Refurbished" ]
  productForm !: FormGroup;
  actionBtn:string = "save";
  constructor( private formBuilder : FormBuilder ,
    private api : ApiService  ,
    @Inject(MAT_DIALOG_DATA) public  editData :any,//pOR AQUI E INJECTA LA DATA CUANDO SE EDITA
    private dialogReft : MatDialogRef <DialogComponent>) { }
  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productName:['',Validators.required],
        category :['',Validators.required],
       freshneess :['',Validators.required],
           price :['',Validators.required],
         comment :['',Validators.required],
            date :['',Validators.required],
    })
    if(this.editData)
    {
      this.actionBtn = "update";
      this.productForm.controls["productName"].setValue(this.editData.productName);
      this.productForm.controls["category"].setValue(this.editData.category);
      this.productForm.controls["freshneess"].setValue(this.editData.freshneess);
      this.productForm.controls["price"].setValue(this.editData.price);
      this.productForm.controls["comment"].setValue(this.editData.comment);
      this.productForm.controls["date"].setValue(this.editData.date);
    }

  }


   addProduct(){
if(!this.editData){

 if(this.productForm.valid)
 {

  this.api.postProduct(this.productForm.value).subscribe({
    next:(res)=> {
      alert("Product addes Successfully");
      this.productForm.reset();
      this.dialogReft.close('save');
    },
    error:()=>{
      alert("Errro while adding the PRODUCT")
    }
  })
 }
 else{alert("***formulario es Invalido***")}
}

else{
  this.updateProduct()
}

  }

  updateProduct(){
    this.api.putProduct(this.productForm.value,this.editData.id)
    .subscribe({
           next:(res)=>{
            alert("Product updae Successfully");
            this.productForm.reset();
            this.dialogReft.close('update');
           },
           error:()=>{
            alert("Error while updating the record")
           }
    })
  }

}



