function getId(){ console.log('ok');
    const querystring = window.location.search;
    const params = new URLSearchParams(querystring);
    const iD = params.get("id");
    console.log(iD);
}

getId();



/*<article id="page_produit">
                <section class="produit_page1">
                    <div class="img_produit">
                        <img src="" alt="">
                    </div>
                    <div class="info_produit">
                        <p></p>
                        <div class="nom_produit">
                            <h3></h3>
                        </div>
                        <div class="prix-produit">
                            <p></p>
                        </div>
                        <div class="description">
                          <h4></h4>
                          <p> </p>
                           <h4></h4>
                            
                        </div>
                    </div>
                </section>
            </article>*/