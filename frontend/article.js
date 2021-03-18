function getId(){ console.log('ok');
    const querystring = window.location.search;
    const params = new URLSearchParams(querystring);
    const iD = params.get("id");
    console.log(iD);
}

getId();

