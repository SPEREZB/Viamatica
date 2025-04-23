import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  ApexNonAxisChartSeries,
  ApexChart,
  ApexAxisChartSeries,
  ApexXAxis,
  ApexTitleSubtitle
} from 'ng-apexcharts';
import { PeliculasService } from 'src/app/modules/peliculas/services/peliculas/peliculas.service';
import { SalasService } from 'src/app/modules/salas/services/salas.service';
export type ChartOptions = {
  series: ApexNonAxisChartSeries | ApexAxisChartSeries;
  chart: ApexChart;
  xaxis?: ApexXAxis;
  labels?: string[];
  title?: ApexTitleSubtitle;
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})


export class DashboardComponent {
  totalSalas: number = 0;
  salasDisponibles: number = 0;
  totalPeliculas: number = 0;
  Películas:any;
  fechasPeliculas:any;
  totalPeliculasHistorico:any;

  constructor( private salaService:SalasService, private peliculaService:PeliculasService) {}

  async ngOnInit(): Promise<void> {
    await this.getTotalSalas();
    await this.getSalasDisponibles();
    await this.getTotalPeliculas(); 
  }
  
  getTotalSalas(): Promise<void> {
    return new Promise((resolve) => {
      this.salaService.getAllSalas().subscribe((response) => {
        this.totalSalas = response.length;
        console.log(`Total salas: ${this.totalSalas}`);
        resolve();
      });
    });
  }
  
  getSalasDisponibles(): Promise<void> {
    return new Promise((resolve) => {
      this.salaService.getAllSalas().subscribe((response) => {
        this.salasDisponibles = response.filter(sala => 
          sala.estado?.toLowerCase() === 'disponible'
        ).length;
        console.log(`Salas disponibles: ${this.salasDisponibles}`);
        resolve();
      });
    });
  }
  
  getTotalPeliculas(): Promise<void> {
    return new Promise((resolve) => {
      this.peliculaService.getPeliculas().subscribe((response) => {
        this.totalPeliculas = response.length;
        console.log(`Total películas: ${this.totalPeliculas}`);
        resolve();
      });
    });
  }
}
