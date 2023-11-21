(function ($) {
    let apiURL = 'https://company.vietnambestplacestowork.com/api/export-company-award/{award}/{year}?x_auth_token=AwHBFADBohjsnZj6lK7yRM9lI1OH5EZx'

    let template = {
        "grid": {
            "<>": "div", "class": "row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5", "html": function () {
                return ($.json2html(this.companies, template.grid_items));
            }
        },

        "grid_items": {
                "<>": "div", "class": "col ranking-item p-0 m-0 border-0", "html": [
                    {
                        "<>": "div", "class": "card h-100 bg-white mbr-text border border-0", "html": [
                            {
                                "<>": "div", "class": "card-body", "html": [
                                    {
                                        "<>": "div",
                                        "style": "line-height: 1em; font-size: 16px; font-weight: 500; position: absolute;top: 0;left: 0;background: orange;padding: 10px;border-radius: 0.25rem 0 0 0;color: white;",
                                        "class": function () {
                                            if (this.ranking == 0) {
                                                return "d-none";
                                            } else {
                                                return "ranking-position";
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
                                        "class": "card-title fs-6 text-center",
                                        "html": function () {
                                            if (this.portal_url.length > 0) {
                                                return '<a class="text-black" href="' + this.portal_url + '"' + '>' + this.name + '</a>'
                                            } else {
                                                return this.name;
                                            }
                                        }
                                    },
                                    {
                                        "<>": "p",
                                        "class": "card-text text-dark display-7 d-none",
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
        "list": {
            "<>": "div", "class": "row row-cols-1 row-cols-lg-2", "html": function () {
                return ($.json2html(this.companies, template.list_items));
            }
        },

        "list_items": {
            
                "<>": "div", "class": "col ranking-item ", "html": [
                    {
                        "<>": "div", "class": "d-flex mbr-text text-center align-items-center  border-bottom p-2", "html": [
                            
                                
                            {
                                "<>": "div",
                                "style": "width:80px; padding:12px 0; background: #d2e8f3",
                                "class": function () {
                                    if (this.ranking == 0) {
                                        return "d-none";
                                    } else {
                                        return "ranking-position rank-num fs-4 text-success flex-shrink-0";
                                    }
                                },
                                "html": "#${ranking}"
                            },
                            {
                                "<>": "a",
                                "class": "px-4",
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
                                        "class": "mx-auto d-block",
                                        "alt": "${name}",
                                        "style": "width: initial",
                                        "html": ""
                                    }
                                ]
                            },
                            {
                                "<>": "h5",
                                "class": "px-4 fs-6 text-center",
                                "html": function () {
                                    if (this.portal_url.length > 0) {
                                        return '<a class="text-black" href="' + this.portal_url + '"' + '>' + this.name + '</a>'
                                    } else {
                                        return this.name;
                                    }
                                }
                            },
                        ]
                    }
                ]
          
        },
        
    };
    
    function rankingDisplayByJson2HTML(data) {
        $('.loading-data').hide();

        
        // if 2023
        if($('#select_year').val() == 2023) {
            if( $('#award').val() == 'top100'  || $('#award').val() == 'top100sme' ) {

                console.log("debug", data);
                let top1 = data.slice(0,1);
                let top10 = data.slice(1,10);
                let top20 = data.slice(10,20);
                let top50 = data.slice(20,50);
                let top100 = data.slice(50);
        
                top1[0].logo_link = top1[0].logo_link.replace('rectMedium','rectLarge');
        
                top10.sort(function(a,b) {return a.name.localeCompare(b.name);});
                top20.sort(function(a,b) {return a.name.localeCompare(b.name);});
                top50.sort(function(a,b) {return a.name.localeCompare(b.name);});
                top100.sort(function(a,b) {return a.name.localeCompare(b.name);});
            // console.log(top10, a);
                
                $("#vnbptw-ranking-top1").empty().json2html({'companies':top1}, template.grid);
                $("#vnbptw-ranking-top10").empty().json2html({'companies':top10}, template.grid);
                $("#vnbptw-ranking-top20").empty().json2html({'companies':top20}, template.grid);
                $("#vnbptw-ranking-top50").empty().json2html({'companies':top50}, template.grid);
                $("#vnbptw-ranking-top100").empty().json2html({'companies':top100}, template.grid);
            }
            else {
                data.sort(function(a,b) {return a.name.localeCompare(b.name,'en');});
                $("#vnbptw-ranking").empty().json2html({'companies':data}, template.grid);
            }
        }
        else {
            $("#vnbptw-ranking").empty().json2html({'companies':data}, template.grid);
        }

        $("#ranking-filter").on("keyup", function () {
            let value = remove_vn_character($(this).val().toLowerCase());
            $("#vnbptw-ranking .ranking-item").filter(function () {
                let search = remove_vn_character($(this).text().toLowerCase());
                $(this).toggle(search.indexOf(value) > -1)
            });
        });
        $('#bptw-view-grid').click(function () {
            $("#ranking-filter").val("");
            $("#vnbptw-ranking").empty().json2html({'companies':data}, template.grid);
        })
        $('#bptw-view-table').click(function () {
            $("#ranking-filter").val("");
            $("#vnbptw-ranking").empty().json2html({'companies':data}, template.list);
        })
    }
    function getData(url) {
        $.get(url, function (data, status) {
            
            rankingDisplayByJson2HTML(data);

            if (window.location.pathname.includes('top10-haw')) {
                $('#bptw-view-table').click();
            }
        });
    }
    function getDataURL() {
        let award = $('#award').val();
        let year = $('#select_year').val();
        let url = new URL(window.location.href);
            
        let industry = $('#select_industry').val();
        let dataURL = apiURL.replace('{year}', year);
        if (industry) {
            dataURL = dataURL.replace('{award}', industry)    
        }
        else {
            dataURL = dataURL.replace('{award}', award);
        }
        console.log(dataURL);
        return dataURL;
    }

    $(document).ready(function () {
        getData(getDataURL());

        $("#select_industry").change(function () {
            getData(getDataURL());
        });

        $('#select_year').change(function () {
            let page = 'top-100-noi-lam-viec-tot-nhat-viet-nam-' + $('#select_year').val() + '.html';
            window.location.href = page;
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