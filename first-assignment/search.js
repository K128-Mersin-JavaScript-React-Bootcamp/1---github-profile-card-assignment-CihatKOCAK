function search() {

    $(".scDiv").css("display","block");
    var lang = [], percent = [], link, name, username, allCodeSize = 0, repos = 0, pict, counter = 0;
    link = document.getElementById("lname").value;
    const url = "https://api.github.com/users/" + link;


    axios.get(url).then((response) => {
        img = response.data.avatar_url;
        name = response.data.name;
        username = response.data.login;
        pict = response.data.avatar_url;
        console.log(response.data);


        reposLink = response.data.repos_url;

        //*******for repos data//*******

        axios.get(reposLink).then((response) => {
            var repos = [];
            var keys = response.data;
            var i = 0;
            keys.forEach(function (key) {
                repos.push(key);
                allCodeSize += key.size;
                i++;
            });

            //*******remove duplicates in lang array//*******

            for (let i = 0; i < repos.length; i++) {
                let codeSize = 0;
                if (repos[i] == null) //controller for repo  
                    continue;
                if (repos[i]['language'] == null)    //controller for language
                    repos[i].language = 'Undefined Languages';
                lang.push(repos[i]['language']);

                for (let i = 0; i < repos.length; i++) {
                    if (repos[i] == null) //controller for repos
                        continue;
                    if (repos[i]['language'] == null)   //controller language for undefined languages
                        repos[i].language = 'Undefined Languages';
                    if (repos[i]['language'] == lang[counter]) {
                        codeSize += repos[i]['size'];
                        repos[i] = null;
                    }

                }
                counter++;
                percent.push(codeSize);
            }
            //*******print to screen//*******
            for (let i = 0; i < lang.length; i++)
                document.getElementById("addToMe").innerHTML += '<div class="child flex-child"><i class="cbp-ig-icon devicon-' + lang[i].toLowerCase() + '-plain"></i><p">' + lang[i] + '</p><p">' + Math.round((percent[i] * 100) / allCodeSize) + '%</p></div>';
            document.getElementById("repos").innerText = repos.length + "repo(s)";

            if (allCodeSize < 1000)
            document.getElementById("codeSize").innerText = allCodeSize  + "KB code";
            else
            document.getElementById("codeSize").innerText = allCodeSize / 1000 + "MB code";
            document.getElementById("name").innerText = "Name: " + name;
            document.getElementById("username").innerText = "User Name: " + username;
            document.getElementById("img").innerHTML = '<img src ="' + img + '" width="125" height="150"></img>';

        });
    }).catch((error) => {
        document.getElementById("error").innerText = "User not found!"

    });


}

