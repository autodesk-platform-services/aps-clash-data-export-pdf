# BIM 360 Model Coordination - PDF Clash Export

[![node](https://img.shields.io/badge/nodejs-v10+-yellow.svg)](https://nodejs.org)
[![npm](https://img.shields.io/badge/npm-v6+-yellow.svg)](https://www.npmjs.com/)

[![oAuth2](https://img.shields.io/badge/oAuth2-v1-green.svg)](https://forge.autodesk.com/en/docs/oauth/v2/overview/)
[![Data-Management](https://img.shields.io/badge/Data%20Management-v1-green.svg)](https://forge.autodesk.com/en/docs/data/v2/developers_guide/overview/)
[![Viewer](https://img.shields.io/badge/Viewer-v7.25-green.svg)](https://forge.autodesk.com/en/docs/viewer/v7/developers_guide/overview/)
[![Model Coordination API](https://img.shields.io/badge/BIM%20360-v1-green.svg)](https://forge.autodesk.com/en/docs/bim360/v1/overview/introduction/) 

[![Model Set Lib](https://img.shields.io/badge/BIM%20360%20Model%20Set-3.0.65-orange)](https://www.npmjs.com/package/forge-bim360-modelcoordination-modelset)
[![Clash Lib](https://img.shields.io/badge/BIM%20360%20Clash-3.3.27-orange)](https://www.npmjs.com/package/forge-bim360-modelcoordination-clash)

[![License](http://img.shields.io/:license-MIT-red.svg)](http://opensource.org/licenses/MIT)
[![Level](https://img.shields.io/badge/Level-Intermediate-blue.svg)](http://developer.autodesk.com/)


## Description
This repository demonstrates advanced viewing of clash raw data by Model Coordination API and demos exporting a PDF report on the clashes the user is interested in. 
 
## Thumbnail

![thumbnail](/thumbnail.png)

## Live version

Live version: [bim360-clash-pdf-exporter.herokuapp.com](https://bim360-clash-pdf-exporter.herokuapp.com)

> To use this sample with your BIM 360 you need to "Enable Custom Integrations". At the app top-right, click **Config** to get detailed steps.

Recording: [this video](https://youtu.be/eb-yXJ9LjIw) on how to play the demo. 

## Demonstrations

To work with the sample, firstly upload some source models to BIM 360 folder, then create model set in Model Coordination module with this folder. Please refer to [BIM 360 Model Coordination documentation](http://help.autodesk.com/view/BIM360D/ENU/?guid=GUID-38CC3A1C-92FF-4682-847F-9CFAFCC4CCCE) for details. Check [Model Coordination Sample Files](https://github.com/xiaodongliang/Demo-Test-Sample-Files/tree/master/Model%20Coordination%20API) for testing RVT files, it includes two versions of models set.

1. After logging in, on top left of the navigation panel, select one hub, then select one project. 
2. After selecting one project, the active modelsets in this activeproject will be listed.
3. Click one modelset, all documents in the modelset will be grouped in the dropdown list of **Clash Breakdown by Element** . All the documents of this modelset will also be loaded in the APS viewer
4. After all documents are loaded in the APS Viewer, select one document from dropdown list, the clashes by document elements will be listed. Select one clash or group of clashes, the corresponding clashes will be highlighted in the APS viewer. 
5. Tick some clashes, click **Export PDF**. After a while, a report will be generated. It contains an overview of the modelset and information of each clash, including a screenshot. 
*Note: do not touch APS Viewer while exporting is running because the code will take snapshot of each clash.*
 
Watch [this video](https://youtu.be/eb-yXJ9LjIw) to learn how to use this demo.

## Technology Architecture

The sample first downloads the model set data and clash data of the selected project. 

![Workflow](/help/workflow.png)

The relationship of the data are clash mapping, please refer to the other sample [Clash View Basic](https://github.com/autodesk-platform-services/aps-clash-data-view) 

Based on the relationship, the code analyzes the data to build the mapping among the clash document, version URN and viewable guid etc. The mapping is saved to **docsMap.json**

![Document Map](/help/docmap.png)

The method [getBreakdownData](./server/analyze.js) iterates each clash instances. For one element (lvid) of one clash, the method dumps all clashes that this element (lvid) is involved, and groups them in the document.

![Document Map](/help/breakdown.png)

# Setup

## Prerequisites

1. **BIM 360 Account**: must be an Account Admin to add the app custom integration, or invited by an admin of a BIM 360 Account. [Learn about provisioning](https://forge.autodesk.com/blog/bim-360-docs-provisioning-forge-apps). 
2. **APS Account**: Learn how to create a APS Account, activate subscription and create an app at [this tutorial](http://aps.autodesk.com/tutorials/#/account/). Get _APS client id_, _APS client secret_ and _APS callback url_ and input them to [config.js](./server/config.js)
3. Create some [modelsets of Model Coordination](https://knowledge.autodesk.com/support/bim-360/learn-explore/caas/CloudHelp/cloudhelp/ENU/BIM360D-Model-Coordination/files/GUID-38CC3A1C-92FF-4682-847F-9CFAFCC4CCCE-html.html) in BIM 360. 
4. **Node.js**: basic knowledge with [Node.js](https://nodejs.org/en/).
5. **JavaScript** basic knowledge with **jQuery** and **Bootstrap**

## Running locally
Clone this project or download it. It's recommended to install [GitHub desktop](https://desktop.github.com/). To clone it via command line, use the following (**Terminal** on MacOSX/Linux, **Git Shell** on Windows):

    git clone https://github.com/autodesk-platform-services/aps-clash-data-export-pdf

Open the project folder in **Visual Studio Code**. Install the required packages, set the environment variables with your client ID & secret and finally start it. Via command line, navigate to the folder where this repository was cloned and use the following:

Mac OSX/Linux (Terminal)

    npm install
    export APS_CLIENT_ID=<<YOUR CLIENT ID FROM DEVELOPER PORTAL>>
    export APS_CLIENT_SECRET=<<YOUR CLIENT SECRET>>
    export APS_CALLBACK_URL=<<YOUR CALLBACK URL>>
    npm start

Windows (use **Node.js command line** from Start menu)

    npm install
    set APS_CLIENT_ID=<<YOUR CLIENT ID FROM DEVELOPER PORTAL>>
    set APS_CLIENT_SECRET=<<YOUR CLIENT SECRET>>
    set APS_CALLBACK_URL=<<YOUR CALLBACK URL>>
    npm start

Open the browser: [http://localhost:3000](http://localhost:3000).

## Deployment

To deploy this application to Heroku, the **Callback URL** for APS must use your `.herokuapp.com` address. After clicking on the button below, at the Heroku Create New App page, set your Client ID, Secret and Callback URL for APS.

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

Watch [this video](https://www.youtube.com/watch?v=Oqa9O20Gj0c) on how deploy samples to Heroku.
 

## Further Reading
- [Model Coordination](https://forge.autodesk.com/en/docs/bim360/v1/overview/field-guide/model-coordination/)
- [BIM 360 API](https://forge.autodesk.com/en/docs/bim360/v1/overview/) and [App Provisioning](https://forge.autodesk.com/blog/bim-360-docs-provisioning-forge-apps)
- [Data Management API](https://forge.autodesk.com/en/docs/data/v2/overview/)
- [Viewer](https://forge.autodesk.com/en/docs/viewer/v7)

## Tutorials
- [Model Coordination API](https://forge.autodesk.com/en/docs/bim360/v1/tutorials/model-coordination)
- [View BIM 360 Models](http://learnforge.autodesk.io/#/tutorials/viewhubmodels)

## Blogs:

- [APS Blog](https://forge.autodesk.com/categories/bim-360-api)
- [Field of View](https://fieldofviewblog.wordpress.com/), a BIM focused blog

### Tips & Tricks

-  Since the clash data might be large, don't pull the file locally and then process it. Decompressing and streaming the results on the fly would also be recommended, as showned in this sample [utility.js](./server/utility.js) 
- To make a simple demo, this sample does not use database to manage the clash data. 
- On client (browser) side, it may be more efficient to manage the data by IndexDB if the app requires to perform various analysis in different browser sessions.
- Do not touch APS Viewer while exporting PDF is running because the code will take snapshot of each clash.


### Troubleshooting

-  **Cannot see my BIM 360 projects**: Make sure to provision the APS App Client ID within the BIM 360 Account, [learn more here](https://forge.autodesk.com/blog/bim-360-docs-provisioning-forge-apps). This requires the Account Admin permission.

- The code of highlighting objects within APS Viewer requires the corresponding documents of one clash instance have been loaded. If not, the highlighting will not work, try again when the loading is completed
 
## License

This sample is licensed under the terms of the [MIT License](http://opensource.org/licenses/MIT). Please see the [LICENSE](LICENSE) file for full details.

## Written by

Xiaodong Liang [@coldwood](https://twitter.com/coldwood),  Develope Advocacy and Support,Autodesk