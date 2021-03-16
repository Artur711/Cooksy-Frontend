import {Component, EventEmitter, Output} from '@angular/core';
import {TypeDish} from "../models/type";
import {Select} from "../models/select";

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent {

  @Output()
  onSelectChange = new EventEmitter<Select>();

  ingredients: string[] = [];
  equipments: string[] = [];
  types: TypeDish[] = SelectComponent.getTypes();
  isCollapsed = true;

  collapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  search(): void {
    this.onSelectChange.emit({ingredients: this.ingredients, equipments: this.equipments, types: this.types})
  }

  addIngredient(ingredient: string): void {
    if (ingredient != '') {
      this.ingredients.push(ingredient);
    }
  }

  removeIngredient(ingredient: string): void {
    const index: number = this.ingredients.indexOf(ingredient);
    if (index !== -1) {
      this.ingredients.splice(index, 1);
    }
  }

  addEquipment(equipment: string): void {
    if (equipment != '') {
      this.equipments.push(equipment);
    }
  }

  removeEquipment(equipment: string): void {
    const index: number = this.equipments.indexOf(equipment);
    if (index !== -1) {
      this.equipments.splice(index, 1);
    }
  }

  removeAll(): void {
    this.ingredients = [];
    this.equipments = [];
    for (let type of this.types) {
      type.isChecked = false;
    }
  }

  checkIfTypeIsUnchecked(): boolean {
    return this.types.filter(type => type.isChecked).length != 0;
  }

  private static getTypes(): TypeDish[] {
    return [{name: 'Main course', isChecked: false},
      {name: 'Side dish', isChecked: false},
      {name: 'Dessert', isChecked: false},
      {name: 'Appetizer', isChecked: false},
      {name: 'Salad', isChecked: false},
      {name: 'Bread', isChecked: false},
      {name: 'Breakfast', isChecked: false},
      {name: 'Soup', isChecked: false},
      {name: 'Beverage', isChecked: false},
      {name: 'Sauce', isChecked: false},
      {name: 'Marinade', isChecked: false},
      {name: 'Fingerfood', isChecked: false},
      {name: 'Snack', isChecked: false},
      {name: 'Drink', isChecked: false}];
  }
}
