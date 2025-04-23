import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { LocalstorageService } from 'src/app/core/services/localstorage/localstorage.service';
import { ThemeService } from 'src/app/core/services/theme/theme.service';
import { LoginService } from 'src/app/modules/login/services/login.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  isMenuOpen = false;
  isMobile=false;
  isAdmin = false;

  constructor(private router: Router, private localStorageService:LocalstorageService, public themeService: ThemeService, private loginService:LoginService) {}

  isDarkMode: boolean = false; 

  ngOnInit(): void {
    this.router.navigate(['/dashboard']);  
 
    this.isDarkMode= this.themeService.getThemeMode(); 
    this.checkScreenSize();
    this.verifyUserType();
  } 

  checkScreenSize() {
    this.isMobile = window.innerWidth <= 768; 
    if(this.isMobile==true)
    {
    this.router.navigate(['/menu_movil']); 

    }
  }
  
  verifyUserType()
  {
     if(this.localStorageService.getItem("user_type")=="Admin")
        this.isAdmin= true;
      else this.isAdmin=false;
  }

  toggleTheme(): void {
    this.themeService.setDarkMode(!this.themeService.isDarkMode); 
    this.isDarkMode= this.themeService.getThemeMode(); 

  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  @Output() logout = new EventEmitter<void>();
 
  onLogout() {
    this.logout.emit();
  }
}
