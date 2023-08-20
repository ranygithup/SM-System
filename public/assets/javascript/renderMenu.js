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
            'name':'Level',
            'component':'LevelComponent',
            'icon':'level.png'
        },
        {
            'name':'Main Program',
            'component':'MainProgramComponent',
            'icon':'main_programs.png'
        },
        {
            'name':'Services',
            'component':'ServicesComponent',
            'icon':'service.png'
        },
        {
            'name':'Books',
            'component':'BookComponent',
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
            'icon':'uniform.png',
            'sub_menu':[
                {
                    "name":"Students",
                    "component":"UniformStudentComponent",
                    "icon":"uniform.png"
                },
                {
                    "name":"Teacher",
                    "component":"UniformTeacherComponent",
                    "icon":"uniform.png"
                }
            ]
        },
        {
            'name':'Score',
            'component':'ScoreComponent',
            'icon':'score.png'
        },
        {
            'name':'Attendance',
            'icon':'attendance.png',
            'sub_menu': [
                {
                    "name":"Teacher",
                    "component":"TeacherAttendanceComponent",
                    "icon":"teacher_list.png"
                },
                {
                    "name":"Student",
                    "component":"StudentAttendanceComponent",
                    "icon":"student_list.png"
                }
            ]
        },
        {
            'name':'Student List',
            'component':'StudentListComponent',
            'icon':'student_list.png'
        },
        {
            'name':'Teacher List',
            'component':'TeacherListComponent',
            'icon':'teacher_list.png'
        },
        {
            'name':'Job Opportunity',
            'component':'JobOpportunityComponent',
            'icon':'job_opportunity.png'
        },
        {
            'name':'Branch and Location',
            'component':'BranchAndLocationComponent',
            'icon':'branch_and_location.png'
        },
        {
            'name':'User Management',
            'icon':'user_management.png',
            'sub_menu':[
                {
                    "name":"Manage Role",
                    "component":"Management Role",
                    "icon":"user_management.png"
                },
                {
                    "name":"Manage User",
                    "component":"Management User",
                    "icon":"user_management.png"
                }
            ]
        },
        {
            'name':'Mobile Setting',
            'component':'MobileSettingsComponent',
            'icon':'mobile_setting.png'
        },
        {
            'name':'Log Out',
            'component':'LogOutComponent',
            'icon':'logout.png'
        }
    ];
    const menu = new Menu('list_menus',menus_list);
});