# Axelerant
## Objective
Create Event Management System as per directions given by Axelerant for the purpose of assignment

## Dependencies
- Internet Connection is required to get all images except the Axelerant logo. We are using lorem picsum which generates random pictures on each call made to the url
- In assets we have the json file with dummy data eventlist.json, to test with other scenarios make changes here following the object structure.
- execute the npm install command to get the node modules based on package.json file.
- To run the application execute the ng serve command on the same directory level as the node modules.

## Application Behaviour information
### Event Listing Page
- The home page on going to http://localhost:4200/ is the event listing page
- The search input makes a case insensitive search on the name of events
- On clicking sold out button a regret alert is displayed for few seconds below the navbar
- The navbar has the icon and text contact us both of redirect to the website of axelerant
- on clicking book now button we navigate to the event booking page

### Event Booking Page
- The number of seats is mentioned in the header portion of the page
- the complete form is made using angular reactive forms and displays error messages as per requirements on the fly. The form also uses bootstrap classes to make it responsive.
- the submit button is disabled till the form is valid but cancel is always enabled and redirects to the event listing page
- On successful submit proper message is shown below navbar and in console the final form object is logged. After this we get redirected to listing page again
- if we have 6 attendees in total the submit message is hidden till we scroll so scrollintoview is used to scroll to the top and shwo the success alert.

## Good Practices Followed
- Use of Lazy Loaded modules while routing.
- Use of tslint
- Usage of bootstrap responsive classes to avoid breaking in smaller screens. 
- Usage of flex and grids
- BEM naming convention followed for css classes
- handling of unknown urls user may enter manually to page not found or home page
- usage of reactive forms
- using services to prevent resource utlization by event emitters. Although in this case since the scale of application is quite less so this will not have a big impact but in scenarios where lots of events are emitted for component communication, common services optimize the code.

## Enhancements
- Currently we use lorem picsum to get the images which has a flaw. On each call a new image is obtained but for calls made within a very minute time margin same images are returned till next navigation.
This can be improved when we have a proper backend providing the paths to an sftp server.
- creation of backend apis instead of using dummy json
- reducing number of seats from listing page for the event booked. Can be done easily using the shared service storing event data, left out since it was not part of requirements document.
- design level css visual improvements.
- the table heading come one by one in mobile screen size after which the data comes properly, this can be fixed but left out considering time constraints.
- Making more granular components for handling table creation input fields etc. to make development fast through use of common components, since currently this is a small version having few components the need for applciation level common components was not there.
- Making branches and merging through pull requests if multiple developers should work on this at any point of time. Currently pushed directly to master.
- use of OnPush change detection or detachChanges when application grows larger. In current state these will have negligible impact.
