# Nick Stricker Portfolio Backend
## object descriptions


- A `project` has:
    - [x] a unique Id.
    - [x] a unique name.
    - [x] a description.
    - [x] an image.
    - [x] a link to github/project
    - [x] a link to the depolyed site
    - [x] The role i had in the project


### Enpoints

- [ ] Portfolio API has the following endpoints:

    - [ ] GET to '/projects' for retrieving an array of `projects`
    - [ ] restricted POST to '/projects' for adding a `project` ; 
            requires {name, address, requested_funds} ; 
            returns the posted object
    - [ ] restricted PUT to '/projects/:id' by project `id` for updating a `project` ;  
            requires object with changed properties ; 
            returns the updated object
    - [ ] restricted DELETE to '/projects/:id' by project `id` for deleteing a `project` that returns: 

        ```js
        {
            deleted: true
        }
        ```

    - [ ] GET to '/projects/:id' for retrieving a `project` by its `id` that returns an object with the following structure:

        ```js
        {
            id: 1,
            name: 'project name here',
            description: 'the project description',
            img: 'link to the thumbnail image of a project',
            link: 'Link to the github or project page of a project',
            deployed: 'Link to the deployed site',
            role: 'role Nick Stricker had in the project'
        }
        ```
## Heroku
 - heroku git:remote -a app
 - git push heroku master
 - heroku run knex migrate:latest
 - heroku run knex seed:run
 - heroku open
 - heroku pg:info
 - https://codeselfstudy.com/blog/deploy-node-postgres-heroku/