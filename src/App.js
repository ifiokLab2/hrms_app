//import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLogin from './pages/admin-login';
import EmployeeLogin from './pages/employee-login';
import NoPage from './pages/NoPage';
import Header from './components/header';
import EmployerDashboard  from './pages/employer-dashboard';
import AdminSignup  from './pages/admin-signup';
import EmployerOrganizations from './pages/employer-orgainizations';
import EmployeeSignup from './pages/register-employee';
import OrganizationDashboard  from './pages/organization-dashboard';
import EmployeeDashboard from './pages/employee-dashboard';
import EmployeeOrganizationDashboard from './pages/employee-organization-dashboard';
import InstructorSignup from './pages/instructor-signup';
import InstructorLogin from './pages/instructor-login';
import InstructorDashboard from './pages/instructor-dashboard';
import CreateCourse from './pages/create-course';
import Requirements from './pages/course-requirements';
import CourseSections from './pages/course-sections';
import Objectives from './pages/course-objectives';
import CourseEdit from './pages/course-edit';
import Elearning from './pages/elearning';
import Search from './pages/search';
import CourseDetailPage from './pages/course-detail';
import CourseViewPage from './pages/course-view-page';
import OrganizationCourses from './pages/organization-courses';
import EmployeeCourses from './pages/employee-courses';
import CreateInstructorProfile from './pages/instructor-profile-create';
import InstructorProfile from './pages/instructor-profile';
import EditInstructorProfile from './pages/instructor-profile-edit';
import CreateEmployeeProfile  from './pages/employee-profile-create';
import EmployeeProfile from './pages/employee-profile';
import EditEmployeeProfile from './pages/employee-profile-edit';
import CreateEmployerProfile from './pages/employer-profile-create';
import EmployerProfile from './pages/employer-profile';
import EditEmployerProfile from './pages/employer-profile-edit';
import Logout from './pages/logout';
import ClientSignup from './pages/client-signup';
import ClientDashboard from './pages/client-dashboard';
import CreateClientProfile from './pages/client-profile-create';
import ClientProfile from './pages/client-profile';
import EditClientProfile from './pages/client-profile-edit';
import ClientInvite from './pages/client-invite';
import EmployeeInvite from './pages/employee-invitation';
import Expired from './pages/expired';
import ClientOrganization from './pages/client-organization';
import  EmployeeTimesheetEdit from './pages/employee-timesheet-edit';
import  EmployeeTimesheetList from './pages/employee-timesheet-list';
import EmployeeTimesheetDetail from './pages/employee-timesheet-detail';
import StaffsTimesheetList from './pages/staff-timesheet-list';
import ForgotPassword from './pages/forgot-password';
import PasswordConfirm from './pages/password-confirm';
import ClientViaLink from './pages/register-client';
import SalesFunnel from './pages/sales-funnel';
import Leads from './pages/leads';
import LeadsDetail from './pages/leads-detail';
import Deals from './pages/deals';
import DealsDetail from './pages/deals-detail';
import Contacts from './pages/contacts';
import ContactDetail from './pages/contact-detail';
import Activity from './pages/activity';
import ActivityDetail from './pages/activity-detail';


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<AdminLogin />} />
      <Route path="organization/:Id/activity/" element={<Activity />} />
      <Route path="organization/:Id/deals/" element={<Deals  />} />
      <Route path="organization/:Id/activity-detail/" element={<ActivityDetail  />} />
      <Route path="organization/:Id/contacts/" element={<Contacts />} />
      <Route path="organization/:Id/deals-detail/" element={<DealsDetail  />} />
      <Route path="organization/:Id/leads-detail/" element={<LeadsDetail  />} />
      <Route path="organization/:Id/leads/" element={<Leads  />} />
      <Route path="organization/:Id/sales-funnel" element={<SalesFunnel  />} />
      <Route path="/forgot-password/" element={<ForgotPassword />} />
      <Route path="/password/reset/confirm/:uuid/:token/" element={<PasswordConfirm />} />
      <Route path="staffs/timesheet/:Id/:userId/:name/list/" element={<StaffsTimesheetList  />} />
      <Route path="employee/timesheet/:Id/:userId/:name/list/" element={<EmployeeTimesheetList  />} />
      <Route path="employee/timesheet/detail/:timesheet_id/:Id/:name/" element={<EmployeeTimesheetDetail  />} />
      <Route path="employee/timesheet/edit/:timesheet_id/:Id/:name/" element={<EmployeeTimesheetEdit  />} />
      <Route path="expired/" element={<Expired />} />
      <Route path="client/organization/:Id/:name/" element={<ClientOrganization  />} />
      <Route path="client/dashboard/" element={<ClientDashboard />} />
      <Route path="client/profile/create/" element={<CreateClientProfile />} />
      <Route path="client/profile/edit/" element={<EditClientProfile />} />
      <Route path="client/profile/" element={<ClientProfile />} />
      <Route path="client/signup/" element={<ClientSignup />} />
      <Route path="employee-invite/:invitation_code/" element={<EmployeeInvite />} />
      <Route path="client/:invitation_code/" element={<ClientInvite />} />

      <Route path="logout" element={<Logout />} />
      <Route path="employer/profile/edit/" element={<EditEmployerProfile />} />
      <Route path="employer/profile/" element={<EmployerProfile />} />
      <Route path="employer/profile/create/" element={<CreateEmployerProfile />} />
      <Route path="employee/profile/edit/" element={<EditEmployeeProfile />} />
      <Route path="employee/profile/" element={<EmployeeProfile />} />
      <Route path="employee/profile/create/" element={<CreateEmployeeProfile />} />
      <Route path="instructor/profile/" element={<InstructorProfile />} />
      <Route path="instructor/profile/create/" element={<CreateInstructorProfile />} />
      <Route path="instructor/profile/edit/" element={<EditInstructorProfile />} />
      <Route path="course-detail/:id/:title/" element={<CourseDetailPage />} />
      <Route path="organization/courses/" element={<OrganizationCourses />} />
      <Route path="employee/courses/" element={<EmployeeCourses />} />
      <Route path="course-view-page/:id/:title/" element={<CourseViewPage />} />
      <Route path="elearning/" element={<Elearning />} />
      <Route path="courses/add-objectives/:id/:title/" element={<Objectives />} />
      <Route path="courses/add-requirement/:id/:title/" element={<Requirements />} />
      <Route path="instructor/dashboard/" element={<InstructorDashboard   />} />
      <Route path="course-sections/:id/:title/" element={<CourseSections />} />
      <Route path="course/:id/edit/" element={<CourseEdit />} />
      <Route path="search" element={<Search />} />
      <Route path="instructor/courses/create/" element={<CreateCourse />} />
      <Route path="employee/dashboard/" element={<EmployeeDashboard   />} />
      <Route path="instructor/login/" element={<InstructorLogin />} />
      <Route path="instructor/signup/" element={<InstructorSignup />} />
      <Route path="employee/organization/dashboard/:Id/:name/" element={<EmployeeOrganizationDashboard  />} />
      <Route path="employee/login/" element={<EmployeeLogin />} />
      <Route path="organization/dashboard/:Id/:name/" element={<OrganizationDashboard />} />
      <Route path="/employee-signup/:invitation_code/" element={<EmployeeSignup />} />

      <Route path="client-signup/:invitation_code/" element={<ClientViaLink />} />
      <Route path="organizations/" element={<EmployerOrganizations />} />
      <Route path="organization/signup/" element={<AdminSignup />} />
      <Route path="header" element={<Header />} />
      <Route path="employer-dashboard" element={<EmployerDashboard  />} />
      <Route path="*" element={<NoPage />} />
    </Routes>

  </BrowserRouter>
  );
}

export default App;
