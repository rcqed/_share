// 定义一个函数来解析Markdown文件内容
// 127.0.0.1/index.html?i=qnap&m=0（m为0时使用iframe打开，m=1时直接打开，默认m=0）
function parseMarkdown(markdownText) {
    var lines = markdownText.split("\n");
    var data = [];

    for (var i = 0; i < lines.length; i++) {
        var line = lines[i].trim();
        if (line !== "") {
            var parts = line.split(",");
            if (parts.length === 2) {
                data.push({
                    param: parts[0].trim(),
                    link: parts[1].trim()
                });
            }
        }
    }

    return data;
}

// 异步加载URLlink文件
fetch('./URLlink')
    .then(response => response.text())
    .then(data => {
        var parsedData = parseMarkdown(data);

        // 获取URL中的参数
        var urlParams = new URLSearchParams(window.location.search);
        var paramValue = urlParams.get("i");
        var mValue = urlParams.get("m"); // 获取m参数的值

        // 查找匹配的链接
        var matchedLink = null;
        if (paramValue) {
            matchedLink = parsedData.find(function(item) {
                return item.param === paramValue;
            });
        }

		// 如果找到匹配的链接，则根据m参数的值决定是在iframe中打开还是直接跳转
		if (matchedLink) {
			if (mValue === "1") {
				window.location.href = matchedLink.link; // 直接跳转
			} else {
				var iframe = document.createElement("iframe");
				iframe.src = matchedLink.link;
				iframe.style.position = "absolute";
				iframe.style.top = "0";
				iframe.style.left = "0";
				iframe.style.width = "100%";
				iframe.style.height = "100%";
				iframe.style.border = "none";
				iframe.style.backgroundColor = "white"; // 设置背景色为白色
				document.body.appendChild(iframe); // 在当前页面打开iframe
			}
		}
    })
    .catch(error => {
        console.error('无法加载Markdown文件:', error);
    });
