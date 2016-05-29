<home-page>
    <trello-header></trello-header>
    <div class="master-container">
        <div class="row card-list-container">
            <card-list each={opts.lists}></card-list>
        </div>
    </div>
    <add-list-modal></add-list-modal>
    <footer-button></footer-button>
    <script>
        var self = this;
        console.log("hixx")
        console.log(opts.lists)
        this.on("mount", function () {
            $('.add-card-modal-trigger').leanModal();
            setWidth();
        });

        function setWidth() {
            var width = 500* (opts.lists.length);
            console.log("sdlfjlskjdf ", width)
            $(".card-list-container").css("width", width + "px")
        }

        addList(name)   {
            console.log("Pushing" + name);
            setWidth();
            self.update();
            var details = {
                name: name
            };
            var site = fermata.json("")(['card-groups']).post(details, function (err, resp) {
                console.log("done",resp);
                resp.cards = [];
                opts.lists.push(resp);
                self.update();
                $('.add-card-modal-trigger').leanModal();
            });
        }
    </script>
</home-page>