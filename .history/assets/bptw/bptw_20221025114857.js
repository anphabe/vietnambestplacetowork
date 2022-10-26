(function ($) {
    var data = {
        bptw_2021:'https://company.vietnambestplacestowork.com/api/export-company-award/top100/2021?x_auth_token=AwHBFADBohjsnZj6lK7yRM9lI1OH5EZx',



    };
    var bptw_2021 = 'https://company.vietnambestplacestowork.com/api/export-company-award/top100/2021?x_auth_token=AwHBFADBohjsnZj6lK7yRM9lI1OH5EZx';

    function rankingDisplayByJson2HTML(data) {
        let transforms = {
            "list": {
                "<>": "div", "class": "row row-cols-1 row-cols-sm-2 row-cols-md-3", "html": function () {
                    return ($.json2html(data, transforms.list_items));
                }
            },

            "list_items": {
                "<>": "div", "class": "col ranking-item pb-4", "html": [
                    {
                        "<>": "div", "class": "card h-100 bg-white mbr-text border border-1", "html": [
                            {
                                "<>": "div", "class": "card-body", "html": [
                                    {
                                        "<>": "span",
                                        "style": "font-size: 20px; font-weight: 500; position: absolute;top: 0;left: 0;background: orange;display: inline-block;padding: 3px 10px;border-radius: 0.25rem 0 0 0;color: white;",
                                        "class": function () {
                                            if (this.ranking == 0) {
                                                return "d-none";
                                            } else {
                                                return "";
                                            }
                                        },
                                        "html": "#${ranking}"
                                    },
                                    {
                                        "<>": "a",
                                        "href": function () {
                                            if (this.portal_url.length > 0) {
                                                return this.portal_url;
                                            } else {
                                                return "#";
                                            }
                                        },
                                        "html": [
                                            {
                                                "<>": "img",
                                                "src": "${logo_link}",
                                                "class": "mx-auto d-block pt-2 pb-4",
                                                "alt": "${name}",
                                                "style": "width: initial",
                                                "html": ""
                                            }
                                        ]
                                    },
                                    {
                                        "<>": "h5",
                                        "class": "card-title display-5",
                                        "html": function () {
                                            if (this.portal_url.length > 0) {
                                                return '<a class="black" href="' + this.portal_url + '"' + '>' + this.name + '</a>'
                                            } else {
                                                return this.name;
                                            }
                                        }
                                    },
                                    {
                                        "<>": "p",
                                        "class": "card-text text-dark display-7",
                                        "html": function () {

                                            if (this.description.length > 250) {
                                                return this.description.substring(0, 250) + '...'
                                            }
                                            return this.description;
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            "table": {
                "<>": "div", 'class': 'table-responsive', 'html': [
                    {
                        "<>": "table", 'class': 'table table-striped', "html": function () {
                            return ($.json2html(data, transforms.row_items));
                        }
                    }
                ]
            },
            "row_items": {
                '<>': 'tr', 'class': 'ranking-item', 'html':
                    [
                        {
                            '<>': 'td',
                            'class': 'align-middle',
                            'html': function () {
                                if (this.ranking == 0) {
                                    return ' ';
                                } else {
                                    return '<span class="bold text-dark">#' + this.ranking + '</span>'
                                }
                            },

                        },
                        {
                            '<>': 'td', 'class': 'align-middle h5', 'html': function () {
                                if (this.portal_url.length > 0) {
                                    return '<a class="black" href="' + this.portal_url + '"' + '>' + this.name + '</a>'
                                } else {
                                    return this.name;
                                }
                            },
                        },
                        {
                            '<>': 'td', 'class': 'align-middle', 'width': '120', 'html': [
                                {
                                    "<>": "img",
                                    "src": "${logo_link}",
                                    "class": "mx-auto d-block pt-2 pb-4",
                                    "alt": "${name}",
                                    "html": ""
                                },
                            ]
                        },
                        {
                            "<>": "td",
                            "class": "card-text text-dark align-middle",
                            "html": function () {

                                if (this.description.length > 250) {
                                    return this.description.substring(0, 250) + '...'
                                }
                                return this.description;
                            }
                        }
                    ]
            }
        };

        $("#vnbptw-ranking").json2html({}, transforms.list);

        $("#ranking-filter").on("keyup", function () {
            let value = remove_vn_character($(this).val().toLowerCase());
            $("#vnbptw-ranking .ranking-item").filter(function () {
                let search = remove_vn_character($(this).text().toLowerCase());
                $(this).toggle(search.indexOf(value) > -1)
            });
        });
        $('#bptw-view-grid').click(function () {
            $("#ranking-filter").val("");
            $("#vnbptw-ranking").empty().json2html({}, transforms.list);
        })
        $('#bptw-view-table').click(function () {
            $("#ranking-filter").val("");
            $("#vnbptw-ranking").empty().json2html({}, transforms.table);
        })
    }
    function getData(url) {
        $.get(url, function (data, status) {
            rankingDisplayByJson2HTML(data);

            if(window.location.pathname.includes('top10-haw')) {
                jQuery('#bptw-view-table').click();
            }
        });
    }
    function getDataURL() {
        return bptw_2021;
    }

    $(document).ready(function () {
        getData(bptw_2021);
        
        $("#edit-select-industry").change(function() {
            let new_url = new URL(window.location.href);
                new_url.searchParams.set('industry', this.value);
            window.location.href = new_url.toString();
        });
    });
})(jQuery);