// ==UserScript==
// @name           Freibrief.net - blackletter redesigned
// @version       0.3
// @namespace      goosejan@quantentunnel.de
// @include        http://www.freibrief.net/*
// @include        http://freibrief.net/*
// ==/UserScript==
(function() {
var headerbar = document.getElementById("page-header").innerHTML;
document.getElementById("page-header").innerHTML = '<div id="gmOuterDiv">' + headerbar + '</div>';
var css = '#wrap { width: 98% !important; max-width: 98% !important; border: none !important; } .reply-icon span { background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFQAAAAyCAYAAADCxvyGAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAASqSURBVHja7JrPaxQxFMeT6dCTsHjYUwu2veq2gtBrwaOoN/HkQQTbXvXiH1D1HxAVLz1Z8I/w4KnQk79AhfqDVk+FngTBbvJ8L5lkMrMzk506XQrJSJhMMulMPvN9eS/r43ufXjLOE8YYX+Gc38PKJSwzrHQA/ssqAR6QUwDQ1yCxLnfxepuBeHjuwp0vdAff/7xFpwcI9XH1n6LBQVIcUU8BZg6Vyh+s354b3H1FQFcQ6GuU6RRn3FFi/lV0E7BQsTKHiREYgdSKFQbsXynhfIqtG1im7M0ORH1dBhymQsFycWFKq1Ih5DSW9RSvBihMZxQUBxegRpOvMnkEyY6Ggkkhl1Ps6OXjDDiZsTUwIdBlFEY9ilKlZiKlcGEyIaGXMkeNVp2m7gAN1+zLUY5UXAjsEEEOhVYo1XENZSlT60F5jXCVKV3Ns7APzYPACZHDPDoimKRQyVIoKJTlAO06AaEGn5XhYxmmVqaGSWafKGAFmDACEzLzn19cVQXy+MuWcnvVfWa8796mZ/j62vaP+04Li2sKpoYHCp6+BguT6ok1dhiNtQxMqi8srbFv756psrC0XvkV69rNQWPdc5vx1Od7flN/07PNON/7ANMA1RqK16RQvZ4y3Y5tSe7NwOvo6AFNk26a7CQO8351H8w3zjsfyMMnACjU6YrUmzSHCeN9ydMCtS3IceZVNx9wAx/HWScnEWO2nZh5afdcd49Pgcf5oD7L+/r2qX8nlZk+//FxE4oB/ej6WVhjQ/XyoE3aeHbr5cnjY9hEjgkkfEjrYFoHZYGGHtBrxyMhK5nHJ++uiGV9aWHPXtohWY/mgA1RmcZChVWozGNRFZdKCzmtCuQz+doYKw+pQjV348WzoN4BqvfwMhMfo60nFLZUJGN1o8wD16hQrSZhFJmtoWZNJUbmwK0nqVE30mJrZG2CVgs15J+X1eZROruizPwdS6aDcwIq5QHC65ufoIz3EiIfYCQfrLnb3ZAc2WpKx3KnkuQgRVVuI8TrKhRwF9usMMgHhWj2+qcOsGezl1dtMl8KOcoTOLxJEd59hHkZyxlSqRjq2MoAVTCBFbZaoUKVDkTp+JUkSeg/PQ6w+iRF6e6iMlexbCLMaQXV8WCurIN0TI6YpGP+OUxO9QOW8KtXbmwcpr2zfaTLt37+2t/BAbdQ0ssIsW8WWxVfCRls1FT8EaQoKjTzPSw7Cecvrt18dKi8PCOx8oTNzs7NYOdFbBuwmOhQs2cfSXTo4fVvBqKPjQpoTHQYC6Sr1pjo0B3YmOjQnUJjosMETT4mOhwTaEx06BRtTHQ4Gawx0aFDhXad6IBxlipViQTl9qr7zHjfvU3P8PW17R/3neYHq90mOlAmxff3z1WZX1yr/Ip17eagse65zXjq8z2/qb/p2Wac7306T3SgBzRNummykzjM+9V9MN8473y6TnSo+5KnBWpbkOPMq24+E010aDsx89Luue4enwKP80F9llefWBETHf7jZ7yY6NBxQB8THTpTprHQmOjQGdSY6NC5QmOiQ8dQY6JDl+YeEx06VmdMdDgZqDHRoZtAtF2iQybfLbw5JjrUrKHu1tKX6PBPgAEAh1DARC/UIXAAAAAASUVORK5CYII=);} a.top, a.top2 { background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAYAAACprHcmAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAFASURBVHjaXJGxaoNgEMfPr6VDlBYEwSlSXFwFRRwyZioUksmlvkUgL1AiJFveoWNAUSiE0EcpZCpkcAlootH+T2po+8H/O7z73X13p9S2LfGJomgoSdIc3091XQ+h/fl8fodeV6vVnhmJ4cViMRZCbJqmUQBRr6qq2B5hp+v1enuDwxU/AN6jCrFUVaU8z/uEO9jnOI7fBKAZHA9lWVJRFKQoCo1GIxoMBsQ+TuY4EmYC1+R0OnUBlm3bhJfI8zz619JEANQY5gqGYZCmad3Auq6TaZrX3iGN4QPDPKjjOPT7+L7fvfIz6IHhhGHLskiW5T8w9++6bg8nt7iWl8vlBdMru92uewFDdxb+6/qwtWW35zAMx3BsEFQYZKgX4ke0Mk3TdCv1fzAIgkckzHmngHQkfSGWAIyyLPtk5luAAQAmqQw7rDkbuAAAAABJRU5ErkJggg==);} .quote-icon, .quote-icon a { background-image: url(data:image/png;base64,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);} .report-icon, .report-icon a { background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAoCAYAAAD+MdrbAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAFYSURBVHjaYvz//z/DjauMDAQADxC7AvE+IP6ITyETA3EgDYjXAXE1IYXEGrgDjabYwGQonUCsgcxAHAXE6ljUWAJxPpQdC8R+WNRIQ+U4WaACTkC8FIjvA3EHmuIiqIUwMA2IJdDU5ACxLhD/ZYTGMj+QUwe1XYWBdPAIiDcBcSsjWrIxAOIzaC4iBvgA8VZskXIBiGdh06Ghg9OwTTDDcMVyDRC/I9JlX4A4i1Cy+UKCgR/Rcw42A4uwRcyNK1gNBCWXLnwGyuHKXnjCMA0amRgJOxOIF0ELAgYiXQjTOxOaFuEJ2x6aYL9giWU/tIQMUrMMTU0gEE8GhT0LUnLpA+KD0GSAXjCsQ+JXAvEUNDXLoIbuYySyPFwBxOFQCx2oUdrUQOkmahVfIUjhiRewEGngYiBmwxIZZLsQlBsuA/Frahk4WqeM1imjdcponTJapwy7OgUgwACufY5GRlAVBAAAAABJRU5ErkJggg==);} .delete-icon, .delete-icon a { background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAoCAYAAAD+MdrbAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAQ/SURBVHja1JVdSFxHFMfvfrgqRiMaFCmUPgg1mGAgoBAjIYIgKoE+9EX6UEsivvgSIUgUfYgS40Mi+SCpVB+EiiFQ0GqLFBGMlDUYCKzBYEoFw6Imcf3Y9WvX1fz/y5zL7O5FE5I+dOBw586c+d0z95yZv62vr8+w2+2GzWYz2A4ODkyTJvPis7+/H7FwOGzU1NQYenPCKRcLjlsAw3h9wXECaWhn9Y/x2d3dTbi3rq5uKQKEFWLiV74IVNrs7OyV/Pz8X1R01fQjhNHt7e0ZoVDICAaDodHR0Uq4B2E+Oyb7/X7/K9kCjX0uzM7OvtvY2HgR/WMY6+QcQYAYOzs7xtbWluF2u98NDw9fAyw5EiGdkpKSruD5VLYh0aanpydXVFTc293d/TMhIeEr+jIqwra3tw0EEhocHJyH+wjMGwGqLUxubGz8kZaWViHblSQUFRWdxPNbghgd4JHI+BwfH58PBAI+uPeYCZSMpaam1iKCsJ5ljtMHw059q4QtLi4GJicnFxXMbwK1RHjheF8i06GSBAIZKbc+MTExj/HXWPe7nki7lIXD4WCUzVi0ptccoZIs+b8LCwsrHo9nRUW3HwUUmLJAYmLib6rmzAj12uMcyuktuu6Ojg63EdNigbkul+sHPTrZMvscp19paek3KSkpT5F5Iw6owUjvwphLQHpdSnT0y8zMTC4vL29vaGhwxgG1/1WJhZWSAEkCjX0dTP/CwsJTOTk5P8UBVTQOLLqpjpJ5Cli8q6urQR0qhkidZWVl18FIjQPCoRaw01xICGE0ggcGBl4iCW+ksOUM0/Ly8r4uKChoiQLCIQOTbYQRsrm5GYHyHaDlubm59ZmZmRqGKUCBIhBbSUnJZXByTSBhKOgMPSq17TBukX/hM1ZVVTWGj5iXg0TLZ1ZWVnpxcfEd8z7ExMPe3t5t/KsLes0BsIexNfg8UkV/Y2hoaGd5efk7fYtMEHZ1At1zsL95OXimp6cf4OVnI75tonjfq0IPTk1N3cLziWHd/MZ/0Wz/b01Bq8LYyGGaAgviPd+8PKgpsGdWmoLWRT05TFNQDT319fX/mFtW91wDIojTFPU7mtQZjtMUgH3wb476h6Ip6PfDqmM1Be2qJCJWU/De3Nra6os6etp9dw0WjNUUROXCQlespqD/AnPdlteXaAr6tz9WU7hV+IUtgdqt3Y6+9yhNYebhO2J5Y8dqCh2P0hSn0/mYsI8BMqs/HqUpALXAXF9MUxBhLmBX2f9imoLWCMv4ZE1BiSxZaQrsOMbaLIGHaQrGvsdcv5WmwGo7OzvPRJ0UagqgbXSUI6VOASPvx3/jKZqHzyW8H9OTha07MH8PQyVHagqAAZ4eBfDC2q00BWPncatfitIUAHr0/6Qyus4ilwrgKQL0L73AtebTLwePZI5lwdqSmpMyEU3BNp/LmPg0NTVFS4DF1z6rfRBgAMLF00itp1zQAAAAAElFTkSuQmCC); } .edit-icon, .edit-icon a {background-image: url(data:image/png;base64,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) !important;} .navbar {background-repeat: no-repeat !important; background-position: center center !important; background-color: transparent !important;} #gmOuterDiv { background-position: center center !important; background-repeat: repeat !important; background-image: url(data:image/png;base64,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) !important; } html, body { background-image: none !important; background-color: grey !important; }';
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}
}
})();