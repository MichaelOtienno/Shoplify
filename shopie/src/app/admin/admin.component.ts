import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { SinglepageService } from '../services/singlepage.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  constructor(private http: HttpClient, private supervisorService: SinglepageService,
    private userService: UserService, private exploreService: SinglepageService) { }
  //projects
  products: any[] = [];
  filteredProducts: any[] = [];
  completedproductsCount: number = 0;
  ongoingproductsCount: number = 0;
  upcomingproductsCount: number = 0;
  allproductsCount: number = 0;
  searchTearm: string = '';

  userTickets: any[] = [];


  //forms
  showProductForm: boolean = false;
  showUpdateForm: boolean = false;
  showAcceptanceForm: boolean = false

  // projectForm types
  productForm: {
    productName: string;
    productDescription: string;
    productPrice: number;
    productCategory: string;
    productImage: string;
    supplierContact: string;
    Quantity: number;
  } = {
      productName: '',
      productDescription: '',
      productPrice: 0,
      productCategory: '',
      productImage: '',
      supplierContact: '',
      Quantity: 0,
    };


  //error/update responses
  errorResponse!: any
  mainError!: any
  updateResponse!: any
  productID!: any
  isCompleted: boolean = false
  isCompletedr: boolean = true
  isWhichError: boolean = false
  filteredEmployeee!: string
  successResponse: string = ''
  successAssign: string = ''
  noneCompleted: boolean = false

  //authentication
  email: string = '';
  password: string = '';
  loginError: string = '';
  assignableEmployees: string[] = []

  productctID: any;

  //product management

  product() {
    this.productDashboard = true
    this.dashboard = false
    this.profileview = false
  }

  // fetchproducts() {
  //   this.supervisorService.fetchproducts().subscribe((products: any) => {

  //     const productIDs = products.map((product: any) => product.productID);

  //     this.exploreService.allTickets().subscribe((tickets: any) => {
  //       const ticketsByproduct = tickets.reduce((acc: any, ticket: any) => {
  //         const productID = ticket.productID;
  //         if (!acc[productID]) {
  //           acc[productID] = [];
  //         }
  //         acc[productID].push(ticket);
  //         return acc;
  //       }, {});


  //       products.forEach((product: any) => {
  //         const productID = product.productID;
  //         const ticketsForproduct = ticketsByproduct[productID] || [];
  //         const numberOfTickets = ticketsForproduct.length;
  //         product.numberOfTickets = numberOfTickets;
  //       });

  //       this.products = products;
  //       this.filteredproducts = [...this.products];

  //       this.completedproductsCount = 0;


  //       this.ongoingproductsCount = 0;
  //       this.allproductsCount = 0;

  //       this.filterproducts();

  //       this.products.forEach((product: any) => {
  //         this.checkproductCompletion(product);
  //       });

  //       this.products.forEach((product: any) => {
  //         this.checkproductStatus(product);
  //       });
  //       this.allproductsCount = this.products.length;
  //     });
  //   });
  // }


  //filtter products
  filterProducts() {
    this.filteredProducts = this.products.filter((product) =>
    product.productName.toLowerCase().includes(this.searchTearm.toLowerCase()));

    this.completedproductsCount = this.filteredProducts.filter((product) => product.productStatus == 'completed').length;
    this.ongoingproductsCount = this.filteredProducts.filter((product) => product.productStatus == 'ongoing').length;
    this.upcomingproductsCount = this.filteredProducts.filter((product) => product.productStatus == 'upcoming').length;
    this.allproductsCount = this.filteredProducts.length;
  }


  checkproductCompletion(product: any) {
    const currentDate = new Date();
    const endDate = new Date(product.endDate);

    if (currentDate > endDate) {

      product.productStatus = 'completed';
      this.completedproductsCount++;
      this.isCompleted = true;
    }
  }


  checkproductStatus(product: any) {
    const currentDate = new Date();
    const startDate = new Date(product.startDate);
    const endDate = new Date(product.endDate);

    if (currentDate >= startDate && currentDate <= endDate) {
      product.productStatus = 'ongoing';
      this.ongoingproductsCount++;
    } else if (currentDate > endDate) {
      product.productStatus = 'completed';
      this.completedproductsCount++;
    } else if (currentDate < startDate) {

      product.productStatus = 'upcoming';
      this.upcomingproductsCount++;
    }
  }

  //view completed products
  viewOutofstockProducts() {
    this.filteredProducts = this.products.filter((product) => product.productStatus == 'completed');
  }


  //view ongoing products
  viewStockedProducts() {
    this.filteredProducts = this.products.filter((product) => product.productStatus == 'ongoing');

  }

  //show add product form
  addProduct() {
    this.showProductForm = true;
    this.updateResponse = ''
  }
  //close product form
  closeProduct() {
    this.showProductForm = false
  }


  //update product details
  productDetails(product: any) {
    this.productctID = product.productID;
    this.productForm = {
      productName: product.productName,
      productDescription: product.productDescription,
      productPrice: product.productPrice,
      productCategory: product.productCategory,
      supplierContact: product.productContact,
      productImage: product.productImage,
      Quantity: product.Slots,
    };
    this.successResponse = ''
    this.updateResponse = ''
    this.showUpdateForm = true;
  }

  // Update project form
  updateProductForm() {
    const productDataUpdate = {
      productID: this.productctID,
      productName: this.productForm.productName,
      productDescription: this.productForm.productDescription,
      productPrice: this.productForm.productPrice,
      productCategory: this.productForm.productCategory,
      productImage: this.productForm.productImage,
      Quantity: this.productForm.Quantity,
    };
    console.log(productDataUpdate);
    // this.supervisorService.updateproduct(productDataUpdate).subscribe(
    //   (response: any) => {
    //     this.successResponse = 'product updated successfully'
    //     this.fetchproducts();
    //     setTimeout(() => {
    //       this.showUpdateForm = false;

    //     }, 3000);
    //     this.fetchproducts()
    //   },
    //   (error) => {
    //     if (error instanceof ErrorEvent) {
    //       // Client-side error
    //       this.updateResponse += ` Client-side error: ${error.message}`;
    //       setTimeout(() => {
    //         this.updateResponse = ''
    //       }, 3000);
    //     } else if (error instanceof HttpErrorResponse) {
    //       // Server-side error
    //       if (error.error && error.error.error) {
    //         this.updateResponse += `   ${error.statusText} - ${error.error.error}`;
    //         setTimeout(() => {
    //           this.updateResponse = ''
    //         }, 3000);
    //       } else {
    //         this.updateResponse += ` Server-side error: ${error.status} - ${error.statusText}`;
    //       }
    //     }

    //     console.error('Error updating project:', error);
    //   }
    // );
  }

  //close the update product form
  closeUpdate() {
    this.showUpdateForm = false
  }

  //create product
  // submitproductForm() {
  //   this.fetchproducts()
  //   const productData = {
  //     productName: this.productForm.productName,
  //     productDescription: this.productForm.productDescription,
  //     productHighlights: this.productForm.productHighlights,
  //     productPrice: this.productForm.productPrice,
  //     productHost: this.productForm.productHost,
  //     productLocation: this.productForm.productLocation,
  //     productDuration: this.productForm.productDuration,
  //     productCategory: this.productForm.productCategory,
  //     productImage: this.productForm.productImage,
  //     productContact: this.productForm.productContact,
  //     pickupLocation: this.productForm.pickupLocation,
  //     pickupTime: this.productForm.pickupTime,
  //     dropoffLocation: this.productForm.dropoffLocation,
  //     dropoffTime: this.productForm.dropoffTime,
  //     endDate: this.productForm.productEndDate,
  //     startDate: this.productForm.productStartDate,
  //     Slots: this.productForm.Slots,

  //   };
  //   // console.log(productData);

  //   this.supervisorService.createproduct(productData).subscribe(
  //     (response: any) => {
  //       this.fetchproducts()
  //       this.successAssign = 'product created successfully'
  //       setTimeout(() => {
  //         this.errorResponse = '';
  //         this.showproductForm = false;
  //       }, 2500);
  //     },
  //     (error) => {
  //       this.errorResponse = this.supervisorService.errorResponses();
  //       setTimeout(() => {
  //         this.errorResponse = ''

  //       }, 2500);
  //       this.updateResponse = this.supervisorService.updateResponses();

  //       console.error('Error updating project:', error);
  //     }
  //   );
  // }

  // profiles: any;
  // clients: any[] = [];
  // filteredClients: any[] = [];
  // client: any;

  // ngOnInit() {
  //   this.fetchproducts();
  //   this.userService.getAllReviews().subscribe(
  //     (data: any) => {
  //       // console.log(data);
  //       let reviews = JSON.stringify(data)
  //       localStorage.setItem('getReviews', reviews)
  //     },
  //     (error: any) => {
  //       console.error('Error fetching reviews:', error);
  //     }
  //   );


  //   //get admin  details
  //   const userEmail = localStorage.getItem('user_email');
  //   console.log(userEmail);
  //   if (userEmail) {
  //     this.userService.getUserDetails(userEmail).subscribe(
  //       (response) => {
  //         this.profiles = response.details
  //         // console.log(response);
  //         if (this.profiles && this.profiles.length > 0) {
  //           const userDetail = this.profiles[0];
  //           this.userName = userDetail.userName;
  //           this.email = userDetail.email;
  //           this.phone_no = userDetail.phone_no;
  //           // this.password = userDetail.password;
  //         }
  //       },
  //       (error) => {
  //         console.error('Error fetching user details:', error);
  //       }
  //     );

  //   }

  //   //get all users
  //   this.userService.getAllUsers().subscribe(
  //     (data: any) => {

  //       this.clients = data.users;
  //       this.filteredClients = this.clients.filter(client => client.role !== 'admin');
  //     },
  //     (error: any) => {
  //       console.error('Error fetching reviews:', error);
  //     }
  //   );

  // }


  //complete product
  completeproduct() {
    this.showAcceptanceForm = true
  }
  //delete product
  // deleteproduct() {
  //   this.showAcceptanceForm = true
  //   this.showUpdateForm = false
  //   setTimeout(() => {
  //     this.supervisorService.deleteproduct(this.productctID).subscribe(
  //       (data: any) => {
  //         console.log(this.productID);

  //         this.updateResponse = 'deleted successfully'
  //         this.showAcceptanceForm = false
  //         setTimeout(() => {
  //           this.fetchproducts()
  //         }, 2500);

  //       },
  //       (error) => {
  //         console.error('Error updating project:', error);
  //       }

  //     );
  //   }, 3000);
  // }

  //delete Authorization
  // acceptDelete() {
  //   this.deleteproduct()
  //   this.showAcceptanceForm = false
  // }

  closeAuth() {
    this.showAcceptanceForm = false
  }

  clearRegisterError(delay: number) {
    setTimeout(() => {
      this.loginError = '';
    }, delay);
  }

  search() {


  }


  //profile management

  dashboard: boolean = false
  reviews: any[] = [];
  sortedReviews: any[] = [];
  unsortedReviews: any[] = [];
  isReviewReceived: boolean = false;
  reviewDiv: boolean = false
  reviewss: any[] = [];
  profileview: boolean = false
  success: boolean = false;
  error: boolean = false
  userName: string = ''
  phone_no: string = ''
  confirm_password = ''
  successUpdate: string = ''
  updateError: string = ''
  otherReviewStatus: string = ''
  productDashboard: boolean = true


  profileManager() {
    this.productDashboard = false
    this.profileview = true
    this.dashboard = false

  }


  //update profile details
  updateSubmit() {
    if (this.password !== this.confirm_password || this.password.length < 8) {
      this.error = true
      this.updateError = 'password mismatch or less than 8'
      setTimeout(() => {
        this.updateError = '';
        this.error = false

      }, 3000);
      return;
    }
    const profileDataUpdate = {
      userName: this.userName,
      email: this.email,
      phone_no: this.phone_no,
      password: this.password,
    };

    // this.userService.updateProfile(profileDataUpdate).subscribe(
    //   (response) => {
    //     console.log('Profile updated successfully:', response);
    //     this.success = true
    //     this.successUpdate = 'profile changed successfully';
    //     setTimeout(() => {
    //       this.success = false
    //     }, 2500);
    //   },
    //   (error) => {
    //     console.error('Error updating profile:', error);
    //     this.error = true
    //     this.updateError = 'Failed to update profile. ';
    //     setTimeout(() => {
    //       this.error = false

    //     }, 2500);
    //   }
    // );
  }

  //clients management
  //delete user
deleteSuccesss: boolean = false
deleteSuccess: string = ''
deletedUser(){

}
  // deletesUser(email: string): void {
  //   this.showAcceptanceForm = true

  //   this.userService.deleteUser(email).subscribe(
  //     (response) => {
  //       console.log('User deleted successfully', response);
  //       this.refreshUserList();
  //       this.deleteSuccesss = true
  //       this.deleteSuccess = 'User deleted successfully'
  //       this.showAcceptanceForm = false

  //     },
  //     (error) => {
  //       console.error('Error deleting user', error);
  //     }
  //   );
  // }
  // refreshUserList(): void {
  //   this.userService.getAllUsers().subscribe(
  //     (data: any) => {
  //       this.clients = data.users;
  //       this.filteredClients = this.clients.filter(client => client.role !== 'admin');
  //     },
  //     (error: any) => {
  //       console.error('Error fetching reviews:', error);
  //     }
  //   );
  // }

  Clients(){
    this.dashboard = true
    this.productDashboard = false
    this.profileview = false

  }



}



