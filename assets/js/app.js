$(function() {
  // off-canvas 控制
  $('.sidebar__toggle').click(function() {
    $('body').toggleClass('off-canvas-on')
  })
  // Category
  $('.category-head span').click(function() {
    if ($(this).hasClass('active')) {
      return
    }
    $('.category-head span').removeClass('active')
    $(this).addClass('active')
    var key = $(this).text()
    $('.category-list ul').hide()
    $('.category-list ul').each(function(i, v) {
      if ($(v).data('key') == key) {
        $(v).fadeIn()
      }
    })
  })
  // 打开搜索
  $('#search').click(function() {
    $('body').removeClass('off-canvas-on')
    $('body').addClass('search-form-on')
  })
  // 关闭搜索
  $('.search-form-close').click(function() {
    $('.search-form-input input').val('')
    $('.search-form-result ul').html('')
    $('body').removeClass('search-form-on')
  })

  // 搜索
  $('.search-form-input input').on('input', function() {
    // 等待数据
    let posts = window.site.searchData
    if (!posts) {
      return
    }
    let input = $.trim($(this).val())
    $('.search-form-result ul').html('')
    if (input.length == 0) {
      return
    }
    let doms = $(posts).find('li')
    doms.each(function(i, v) {
      let title = $(v).text()
      if (title.toLowerCase().indexOf(input.toLowerCase()) != -1) {
        $('.search-form-result ul').append(v)
      }
    })
    let count = $('.search-form-result ul>li').length
    if (count > 0) {
      let summary = $(document.createElement('h4'))
      summary.text('Number of posts found: ' + count)
      $('.search-form-result ul').prepend(summary)
    }
  })

  // 缓存搜索全量结果
  $.ajax({
    url: window.site.baseurl + '/assets/search-data.html',
    dataType: 'html',
    cache: true,
    timeout: 10000,
    success: function(data) {
      window.site.searchData = data
    },
    error: function(err) {
      console.error('Load Search Data Error')
    }
  })
})
