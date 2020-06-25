/*
 * So you've decided to check out the code for my website, cool.
 */
(function () {
    'use strict';

    window.initialize = () => {
        // Retrieve my GitHub repositories and populate #repos with links and descriptions for them.
        let repoList = document.getElementById('repos');
        window.fetch('https://api.github.com/users/xxxconkerxxx/repos').then(response => {
            repoList.children[0].remove();

            if (response.ok) { // Everything went smoothly, hooray!
                // Convert the response to a JSON array.
                response.json().then(repos => {
                    for (let repo of repos) {
                        let repoItem = document.createElement('li');
                        repoItem.innerHTML = `<a href="${repo.html_url}" target="_blank">${repo.name}</a> - ${repo.description}`;
                        repoList.appendChild(repoItem);
                    }
                });
            } else { // Something happened, but I'm not sure what.
                let errorItem = document.createElement('li');
                errorItem.innerText = 'An issue occured retrieving my repository list...';
                repoList.appendChild(errorItem);
            }
        }).catch(error => { // An exception was thrown, report it here.
            repoList.children[0].remove();

            let errorItem = document.createElement('li');
            errorItem.innerText = `The following error occured while retrieving my repository list...\n\n${error}`;
            repoList.appendChild(errorItem);
        });

        // Make external links open in a new tab.
        for (let link of document.getElementsByTagName('a')) {
            if (link.hostname !== location.hostname) {
                link.target = '_blank';
            }
        }
    };
})();