(function ($) {
    var apiURL = {
        top100: 'https://company.vietnambestplacestowork.com/api/export-company-award/top100/{year}?x_auth_token=AwHBFADBohjsnZj6lK7yRM9lI1OH5EZx',
        top50: 'https://company.vietnambestplacestowork.com/api/export-company-award/top50/{year}?x_auth_token=AwHBFADBohjsnZj6lK7yRM9lI1OH5EZx',
        top10haw: 'https://company.vietnambestplacestowork.com/api/export-company-award/{industry}/{year}?x_auth_token=AwHBFADBohjsnZj6lK7yRM9lI1OH5EZx'
    };
    
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
                                "<>": "div", "class": "card-body display-7", "html": [
                                    {
                                        "<>": "span",
                                        "style": "font-size: 16px; font-weight: 500; position: absolute;top: 0;left: 0;background: orange;display: inline-block;padding: 10px;border-radius: 0.25rem 0 0 0;color: white;",
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
                            'style': 'width: 60px;',
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
            $('#loading-data').hide();
            rankingDisplayByJson2HTML(data);

            if (window.location.pathname.includes('top10-haw')) {
                jQuery('#bptw-view-table').click();
            }
        });
    }
    function getDataURL() {
        var dataURL = '';
        let year = jQuery('#select_year').val();
        let url = new URL(window.location.href);
            
        let industry = url.searchParams.get('industry');
        if (industry) {
            dataURL = apiURL.top10haw.replace('{industry}', industry);
            dataURL = dataURL.replace('{year}', year);
        }
        return dataURL;
    }

    $(document).ready(function () {
        getData(getDataURL());

        $("#edit-select-industry").change(function () {
            let new_url = new URL(window.location.href);
            new_url.searchParams.set('industry', this.value);
            window.location.href = new_url.toString();
        });
    });

    function remove_vn_character(input) {
        if (!input) {
            return '';
        }
        var str = input.split("");
        for (var i = 0; i < str.length - 1; i++) {
            if (str[i] == 'á' || str[i] == 'à' || str[i] == 'ả' || str[i] == 'ã' || str[i] == 'ạ' || str[i] == 'ă' || str[i] == 'ắ' ||
                str[i] == 'ặ' || str[i] == 'ằ' || str[i] == 'ẳ' || str[i] == 'ẵ' || str[i] == 'â' || str[i] == 'ấ' || str[i] == 'ầ' ||
                str[i] == 'ẩ' || str[i] == 'ẫ' || str[i] == 'ậ') {
                str[i] = 'a';
            }
            if (str[i] == 'é' || str[i] == 'è' || str[i] == 'ẻ' || str[i] == 'ẽ' || str[i] == 'ẹ' || str[i] == 'ê' || str[i] == 'ế' || str[i] == 'ề' ||
                str[i] == 'ể' || str[i] == 'ễ' || str[i] == 'ệ') {
                str[i] = 'e';
            }
            if (str[i] == 'đ') {
                str[i] = 'd';
            }
            if (str[i] == 'í' || str[i] == 'ì' || str[i] == 'ỉ' || str[i] == 'ĩ' || str[i] == 'ị') {
                str[i] = 'i';
            }
            if (str[i] == 'ó' || str[i] == 'ò' || str[i] == 'ỏ' || str[i] == 'õ' || str[i] == 'ọ' || str[i] == 'ô' || str[i] == 'ố' || str[i] == 'ồ' ||
                str[i] == 'ổ' || str[i] == 'ỗ' || str[i] == 'ộ' || str[i] == 'ơ' || str[i] == 'ớ' || str[i] == 'ờ' || str[i] == 'ở' || str[i] == 'ỡ' ||
                str[i] == 'ợ') {
                str[i] = 'o';
            }
            if (str[i] == 'ú' || str[i] == 'ù' || str[i] == 'ủ' || str[i] == 'ũ' || str[i] == 'ụ' || str[i] == 'ư' || str[i] == 'ứ' ||
                str[i] == 'ừ' || str[i] == 'ử' || str[i] == 'ữ' || str[i] == 'ự') {
                str[i] = 'u';
            }
            if (str[i] == 'ý' || str[i] == 'ỳ' || str[i] == 'ỷ' || str[i] == 'ỹ' || str[i] == 'ỵ') {
                str[i] = 'y';
            }
        }
        ;
        var text = str.join();

        return text.replace(/,/g, "");
    };

})(jQuery);