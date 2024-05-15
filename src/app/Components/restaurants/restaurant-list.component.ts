import { Component } from '@angular/core';
import { RestaurantService } from '../../Services/Restaurant/restaurant.service';
import { Restaurant } from '../../Models/restaurante.model';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrl: './restaurant-list.component.css'
})
export class RestaurantListComponent {
  restaurants: Restaurant[] = [];  // Inicializado como un array vacío
  ciudades: string[] = [];
  categorias: string[] = [];
  selectedCiudad: string = '';
  selectedCategoria: string = '';
  searchText: string = '';
  order: string = '';

  constructor(private restaurantService: RestaurantService) {}

  ngOnInit(): void {
    this.fetchRestaurants();
    this.fetchFilters();
  }

  fetchRestaurants(): void {
    const filters = {
      opcionCiudad: this.selectedCiudad,
      opcionCategoria: this.selectedCategoria,
      cadena: this.searchText,
      orden: this.order,
    };
    this.restaurantService.getRestaurants(filters).subscribe(data => {
      this.restaurants = data.results; // Assuming the API response has a 'results' field
    });
  }

  fetchFilters(): void {
    // Fetch ciudades and categorias from API or define them statically
    this.ciudades = ['Ciudad1', 'Ciudad2', 'Ciudad3'];
    this.categorias = ['Categoria1', 'Categoria2', 'Categoria3'];
  }

  onFilterChange(): void {
    this.fetchRestaurants();
  }
}
