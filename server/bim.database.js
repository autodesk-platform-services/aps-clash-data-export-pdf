/////////////////////////////////////////////////////////////////////
// Copyright 2022 Autodesk Inc
// Written by Develope Advocacy and Support
//
// Permission to use, copy, modify, and distribute this software in
// object code form for any purpose and without fee is hereby granted,
// provided that the above copyright notice appears in all copies and
// that both that copyright notice and the limited warranty and
// restricted rights notice below appear in all supporting
// documentation.
//
// AUTODESK PROVIDES THIS PROGRAM "AS IS" AND WITH ALL FAULTS.
// AUTODESK SPECIFICALLY DISCLAIMS ANY IMPLIED WARRANTY OF
// MERCHANTABILITY OR FITNESS FOR A PARTICULAR USE.  AUTODESK, INC.
// DOES NOT WARRANT THAT THE OPERATION OF THE PROGRAM WILL BE
// UNINTERRUPTED OR ERROR FREE.
/////////////////////////////////////////////////////////////////////

'use strict';   

var bimDatabase={
  ProjectToHubMap:{},
  HubUserList:{},
  HubCompanyList:{},
  IssueTypes:{},
  SubIssueTypes:{},
  RootCauses:{},
  IssueContainerIds:{},
  ClashIssues:{}
}

module.exports = {
  refreshProjectToHub:refreshProjectToHub,
  refreshHQUsersList:refreshHQUsersList,
  refreshHQCompaniesList:refreshHQCompaniesList,
  refreshIssueType:refreshIssueType,
  refreshRootCauses:refreshRootCauses,
  refreshIssueContainerIds:refreshIssueContainerIds,
  refreshClashIssues:refreshClashIssues,
  getBIMDatabase:getBIMDatabase,
  getUserNamebyID:getUserNamebyID
}
 
function refreshProjectToHub(hubId,projectId){
  bimDatabase.ProjectToHubMap[projectId] = hubId 
}

function refreshHQCompaniesList(hubId,allCompanies){
  bimDatabase.HubCompanyList[hubId] = allCompanies 
}

function refreshHQUsersList(hubId,allUsers){
  bimDatabase.HubUserList[hubId] = allUsers 
}

function refreshIssueType(projectId,allIssueTypes,subIssueTypes){
  bimDatabase.IssueTypes[projectId] = allIssueTypes 
  bimDatabase.SubIssueTypes[projectId] = subIssueTypes  
}

function refreshRootCauses(projectId,allRootCauses){
  bimDatabase.RootCauses[projectId] = allRootCauses 
 }

 function refreshIssueContainerIds(projectId,containerId){
  bimDatabase.IssueContainerIds[projectId] = containerId 
 }

 function refreshClashIssues(projectId,clashissues){
  bimDatabase.ClashIssues[projectId] = clashissues 
 }

 function getBIMDatabase(){
   return bimDatabase
 }

 function getUserNamebyID(hubId,id){

  let filter = bimDatabase.HubUserList[hubId].filter(function(data){
    return data.uid == id
  })
  return filter && filter.length>0?  filter[0].name :'<User Not Found>'  
 }
