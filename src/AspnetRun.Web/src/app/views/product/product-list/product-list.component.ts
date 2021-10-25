import { Component, OnInit } from '@angular/core';
import { ProductDataService } from 'src/app/core/services/product-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from 'src/app/shared/interfaces';
import { Column, Formatter, Formatters, OnEventArgs, FieldType } from 'angular-slickgrid';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  columnDefinitions: Column[] = [];
  productList: { products: IProduct[], pageCount: number } = { products: [], pageCount: 1 };

  constructor(private dataService: ProductDataService, private router: Router, route: ActivatedRoute) {
    route.params.subscribe(() => {
      this.getProducts();
    });
  }

  categoryFormatter: Formatter = (row, cell, value, columnDef, dataContext) => {
    return dataContext.category.name;
  };

  ngOnInit(): void {
    this.columnDefinitions = [
      {
        id: 'detail', field: 'id', excludeFromHeaderMenu: true, formatter: Formatters.infoIcon, minWidth: 30, maxWidth: 30,
        onCellClick: (e: Event, args: OnEventArgs) => {
          this.router.navigate(['/product/product-detail/' + args.dataContext.id]);
        }
      },
      { id: 'Name', name: 'Name', field: 'name', sortable: true, filterable: true, filterSearchType: FieldType.string },
      { id: 'UnitPrice', name: 'Unit Price', field: 'unitPrice', sortable: true, filterable: true, filterSearchType: FieldType.date },
      { id: 'Category', name: 'Category', field: 'category.name', formatter: this.categoryFormatter, sortable: true, filterable: true },
    ];
  }

  getProducts() {
    this.dataService.getProductsByName("").subscribe((products: IProduct[]) => {
      this.productList.products = products;
    });
  }
}
