function town() {
    $('.town').each(function() {
        $(this).css('height', $(this).width() + 'px');
    });
}

$(document).ready(function() {

    wow = new WOW({
        boxClass: 'wow',
        animateClass: 'animated',
        offset: 0,
        mobile: true,
        live: false
    });
    wow.init();
    town();
    $(window).resize(function() {
        town();
    });

    $('.online-sale').hover(
        function() {
            $(this).text('ÇOK YAKINDA');
        },
        function() {
            $(this).text('ONLINE SATIŞ');
        }
    );

    $('button').on('click', function() {
        if ($('#email').val()) {
            $(this).attr('disabled', true);
            $('.form-result-text').removeClass('success');
            $('.form-result-text').removeClass('error');
            $('.form-result-text').removeClass('warning');
            $.ajax({
                type: "POST",
                url: 'mail-subscription.php',
                data: {
                    email: $('#email').val()
                },
                success: function(data) {
                    $('.form-result-text').removeClass('d-none');
                    if (data == 1) {
                        $('.form-result-text').addClass('success');
                        $('.form-result-text').text('Aboneliğiniz oluşturuldu. Teşekkürler.');
                    } else if (data == 2) {
                        $('button').removeAttr('disabled');
                        $('.form-result-text').addClass('warning');
                        $('.form-result-text').text('Lütfen geçerli bir e-posta adresi giriniz.');
                    } else {
                        $('button').removeAttr('disabled');
                        $('.form-result-text').addClass('error');
                        $('.form-result-text').text('Bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.');
                    }
                }
            });
        }
    });

    $('input[name="submit"]').on('click', function() {
        $(this).attr('disabled', true);
        $('.form-result-text').removeClass('success');
        $('.form-result-text').removeClass('error');
        $('.form-result-text').removeClass('warning');
        $.ajax({
            type: "POST",
            url: 'mail.php',
            data: $('form').serialize(),
            success: function(data) {
                $('.form-result-text').removeClass('d-none');
                if (data == 1) {
                    $('.form-result-text').addClass('success');
                    $('.form-result-text').text('Mesajınız iletildi. Teşekkürler.');
                } else if (data == 2) {
                    $('button').removeAttr('disabled');
                    $('.form-result-text').addClass('warning');
                    $('.form-result-text').text('Lütfen bilgilerinizi kontrol edip, tekrar deneyiniz.');
                } else {
                    $('button').removeAttr('disabled');
                    $('.form-result-text').addClass('error');
                    $('.form-result-text').text('Bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.');
                }
            }
        });
    });

    $(document).on('click', 'a.scroll-link', function(event) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top
        }, 800);
    });

    $(window).on('load', function() {
        var hash = location.hash.replace('#', '');
        if (hash != '') {
            $('html, body').animate({
                scrollTop: $('#' + hash).offset().top
            }, 800);
        }
    });

    $('.dropdown-menu a.dropdown-toggle').on('click', function(e) {
        if (!$(this).next().hasClass('show')) {
            $(this).parents('.dropdown-menu').first().find('.show').removeClass("show");
        }
        var $subMenu = $(this).next(".dropdown-menu");
        $subMenu.toggleClass('show');

        $(this).parents('li.nav-item.dropdown.show').on('hidden.bs.dropdown', function(e) {
            $('.dropdown-submenu .show').removeClass("show");
        });

        return false;
    });

});