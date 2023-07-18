window.addEventListener('DOMContentLoaded', () => {
    let menus_list = [
        {
            'name':'Dashboard',
            'component':'DashboardComponent',
            'icon':'dashboard.png'
        },
        {
            'name':'Department',
            'component':'DepartmentComponent',
            'icon':'department.png'
        },
        {
            'name':'Main Program',
            'component':'MainProgramComponent',
            'icon':'main_programs.png'
        },
        {
            'name':'Level',
            'component':'LevelComponent',
            'icon':'level.png'
        },
        {
            'name':'Services',
            'component':'ServicesComponent',
            'icon':'service.png'
        },
        {
            'name':'Books',
            'component':'BooksComponent',
            'icon':'book.png'
        },
        {
            'name':'Invoices',
            'component':'InvoicesComponent',
            'icon':'invoice.png'
        },
        {
            'name':'Receipt',
            'component':'ReceiptComponent',
            'icon':'receipt.png'
        },
        {
            'name':'Certificate',
            'component':'CertificateComponent',
            'icon':'certificate.png'
        },
        {
            'name':'Uniform',
            'component':'UniformComponent',
            'icon':'uniform.png'
        },
        {
            'name':'Score',
            'component':'ScoreComponent',
            'icon':''
        },
        {
            'name':'Attendance',
            'component':'AttendanceComponent',
            'icon':''
        },
        {
            'name':'Student List',
            'component':'StudentListComponent',
            'icon':''
        },
        {
            'name':'Teacher List',
            'component':'TeacherListComponent',
            'icon':''
        },
        {
            'name':'Job Opportunity',
            'component':'JobOpportunityComponent',
            'icon':''
        },
        {
            'name':'Branch and Location',
            'component':'BranchAndLocationComponent',
            'icon':''
        },
        {
            'name':'User Management',
            'component':'UserManagementComponent',
            'icon':''
        },
        {
            'name':'Mobile Setting',
            'component':'MobileSettingsComponent',
            'icon':''
        },
        {
            'name':'Log Out',
            'component':'LogOutComponent',
            'icon':''
        }
    ];
    const menu = new Menu('list_menus',menus_list);
});