import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Day } from 'src/app/model/day';

@Injectable({
  providedIn: 'root'
})
export class SettingService {
  
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }



  submitGlobalSetting(data) {
    return this.http.post(this.baseUrl + `Tenant`, data);
  }
  getGlobalSetting() {
    return this.http.get(this.baseUrl + `Tenant`);
  }
  deleteGlobalSetting(tenantId) {
    return this.http.delete(this.baseUrl + `Tenant/${tenantId}/tenantId`);
  }
  updateGlobalSetting(data, tenantId) {
    return this.http.put(this.baseUrl + `Tenant/${tenantId}/tenantId`, data);
  }

  submitActivitiesAssigned(data) {
    return this.http.post(this.baseUrl + `admin_ActivitiesAssigned`,data);
  }
  getActivitiesAssigned(roleId) {
    return this.http.get(this.baseUrl + `admin_ActivitiesAssigned/${roleId}/roleId`);
  }
  deleteActivitiesAssigned(activitiesAssignedId) {
    return this.http.delete(this.baseUrl + `admin_ActivitiesAssigned/${activitiesAssignedId}/activitiesAssignedId`);
  }
  updateActivitiesAssigned(data,roleId) {
    return this.http.put(this.baseUrl + `admin_ActivitiesAssigned/${roleId}/roleId`, data);
  }
 
  


 


  

 
submitSetup_Certification(data) {
  return this.http.post(this.baseUrl + `setup_Certification`,data);
}
getSetup_Certification() {
  return this.http.get(this.baseUrl + `setup_Certification`);
}
deleteSetup_Certification(certificationId) {
  return this.http.delete(this.baseUrl + `setup_Certification/${certificationId}/certificationId`);
}
updateSetup_Certification(data,certificationId) {
  return this.http.put(this.baseUrl + `setup_Certification/${certificationId}/certificationId`, data);
}
getSetup_Country() {
  return this.http.get(this.baseUrl + `setup_Country`);
}
getSetup_BloodGroup() {
  return this.http.get(this.baseUrl + `setup_BloodGroup`);
}
getSetup_ChartOfAccount() {
  return this.http.get(this.baseUrl + `setup_ChartOfAccount`);
}


submitSetup_Department(data) {
  return this.http.post(this.baseUrl + `setup_Department`,data);
}
getSetup_Department() {
  return this.http.get(this.baseUrl + `setup_Department`);
}
deleteSetup_Department(departmentId) {
  return this.http.delete(this.baseUrl + `setup_Department/${departmentId}/departmentId`);
}
updateSetup_Department(data,departmentId) {
  return this.http.put(this.baseUrl + `setup_Department/${departmentId}/departmentId`, data);
}


submitSetup_DepartmentUnit(data) {
  return this.http.post(this.baseUrl + `setup_DepartmentUnit`,data);
}
getSetup_DepartmentUnit() {
  return this.http.get(this.baseUrl + `setup_DepartmentUnit`);
}
deleteSetup_DepartmentUnit(departmentUnitId) {
  return this.http.delete(this.baseUrl + `setup_DepartmentUnit/${departmentUnitId}/departmentUnitId`);
}
updateSetup_DepartmentUnit(data,departmentUnitId) {
  return this.http.put(this.baseUrl + `setup_DepartmentUnit/${departmentUnitId}/departmentUnitId`, data);
}
getSetup_GeneralLedger() {
  return this.http.get(this.baseUrl + `setup_GeneralLedger`);
}
getSetup_GeneralLedgerSub() {
  return this.http.get(this.baseUrl + `setup_GeneralLedgerSub`);
}
getSetup_LocalGovt(stateId) {
  return this.http.get(this.baseUrl + `setup_LocalGovt/${stateId}/stateId`);
}
getSetup_MaritalStatus() {
  return this.http.get(this.baseUrl + `setup_MaritalStatus`);
}
getSetup_State() {
  return this.http.get(this.baseUrl + `setup_State`);
}
getFileUpload(userId,userTypeId) {
  return this.http.get(this.baseUrl + `fileUpload/${userId}/userId/${userTypeId}/userTypeId`)
    ;
}


submitAcademicActiveSemesterMaster(data) {
  return this.http.post(this.baseUrl + `academicActiveSemesterMaster`,data);
}
getAcademicActiveSemesterMaster() {
  return this.http.get(this.baseUrl + `academicActiveSemesterMaster`);
}
getAcademicActiveSemesterMasterById(academicActiveSemesterMasterId) {
  return this.http.get(this.baseUrl + `academicActiveSemesterMaster/${academicActiveSemesterMasterId}/academicActiveSemesterMasterId`);
}
deleteAcademicActiveSemesterMaster(academicActiveSemesterMasterId) {
  return this.http.delete(this.baseUrl + `academicActiveSemesterMaster/${academicActiveSemesterMasterId}/academicActiveSemesterMasterId`);
}
updateAcademicActiveSemesterMaster(data,academicActiveSemesterMasterId) {
  return this.http.put(this.baseUrl + `academicActiveSemesterMaster/${academicActiveSemesterMasterId}/academicActiveSemesterMasterId`, data);
}


submitAcademicActivitiesCalendarMaster(data) {
  return this.http.post(this.baseUrl + `academicActivitiesCalendarMaster`,data);
}
getAcademicActivitiesCalendarMaster() {
  return this.http.get(this.baseUrl + `academicActivitiesCalendarMaster`);
}
getAcademicActivitiesCalendarMasterById(academicActivitiesCalendarMasterId) {
  return this.http.get(this.baseUrl + `academicActivitiesCalendarMaster/${academicActivitiesCalendarMasterId}/academicActivitiesCalendarMasterId`);
}
deleteAcademicActivitiesCalendarMaster(academicActivitiesCalendarMasterId) {
  return this.http.delete(this.baseUrl + `academicActivitiesCalendarMaster/${academicActivitiesCalendarMasterId}/academicActivitiesCalendarMasterId`);
}
updateAcademicActivitiesCalendarMaster(data,academicActivitiesCalendarMasterId) {
  return this.http.put(this.baseUrl + `academicActivitiesCalendarMaster/${academicActivitiesCalendarMasterId}/academicActivitiesCalendarMasterId`, data);
}


submitAcademicActivityType(data) {
  return this.http.post(this.baseUrl + `academicActivityType`,data);
}
getAcademicActivityType() {
  return this.http.get(this.baseUrl + `academicActivityType`);
}
getAcademicActivityTypeById(academicActivityTypeId) {
  return this.http.get(this.baseUrl + `academicActivityType/${academicActivityTypeId}/academicActivityTypeId`);
}
deleteAcademicActivityType(academicActivityTypeId) {
  return this.http.delete(this.baseUrl + `academicActivityType/${academicActivityTypeId}/academicActivityTypeId`);
}
updateAcademicActivityType(data,academicActivityTypeId) {
  return this.http.put(this.baseUrl + `academicActivityType/${academicActivityTypeId}/academicActivityTypeId`, data);
}


submitAcademicYearCalendarMaster(data) {
  return this.http.post(this.baseUrl + `academicYearCalendarMaster`,data);
}
getAcademicYearCalendarMaster() {
  return this.http.get(this.baseUrl + `academicYearCalendarMaster`);
}
getAcademicYearCalendarMasterById(academicYearCalendarMasterId) {
  return this.http.get(this.baseUrl + `academicYearCalendarMaster/${academicYearCalendarMasterId}/academicYearCalendarMasterId`);
}
deleteAcademicYearCalendarMaster(academicYearCalendarMasterId) {
  return this.http.delete(this.baseUrl + `academicYearCalendarMaster/${academicYearCalendarMasterId}/academicYearCalendarMasterId`);
}
updateAcademicYearCalendarMaster(data,academicYearCalendarMasterId) {
  return this.http.put(this.baseUrl + `academicYearCalendarMaster/${academicYearCalendarMasterId}/academicYearCalendarMasterId`, data);
}
getAcademic_Session() {
  return this.http.get(this.baseUrl + `academic_Session/active`);
}
getAcademic_DegreeType() {
  return this.http.get(this.baseUrl + `academic_DegreeType`);
}

submitAdmissionCalendarMaster(data) {
  return this.http.post(this.baseUrl + `admissionCalendarMaster`,data);
}
getAdmissionCalendarMaster() {
  return this.http.get(this.baseUrl + `admissionCalendarMaster`);
}
getAdmissionCalendarMasterById(admissionCalendarMasterId) {
  return this.http.get(this.baseUrl + `admissionCalendarMaster/${admissionCalendarMasterId}/admissionCalendarMasterId`);
}
deleteAdmissionCalendarMaster(admissionCalendarMasterId) {
  return this.http.delete(this.baseUrl + `admissionCalendarMaster/${admissionCalendarMasterId}/admissionCalendarMasterId`);
}
updateAdmissionCalendarMaster(data,admissionCalendarMasterId) {
  return this.http.put(this.baseUrl + `admissionCalendarMaster/${admissionCalendarMasterId}/admissionCalendarMasterId`, data);
}


getAcademic_Semester() {
  return this.http.get(this.baseUrl + `academic_Semester`);
}


submitFinance_CurrencyType(data) {
  return this.http.post(this.baseUrl + `finance_CurrencyType`,data);
}
getFinance_CurrencyType() {
  return this.http.get(this.baseUrl + `finance_CurrencyType`);
}

getFinanceCurrencyType() {
  return this.http.get(this.baseUrl + `finance_CurrencyType/active`);
}
deleteFinance_CurrencyType(currencyTypeId) {
  return this.http.delete(this.baseUrl + `finance_CurrencyType/${currencyTypeId}/currencyTypeId`);
}
updateFinance_CurrencyType(data,currencyTypeId) {
  return this.http.put(this.baseUrl + `finance_CurrencyType/${currencyTypeId}/currencyTypeId`, data);
}

}



