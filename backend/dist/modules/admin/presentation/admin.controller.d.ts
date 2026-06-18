import { AdminService } from '../application/admin.service';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    dashboard(): Promise<any>;
}
