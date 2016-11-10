<?php echo $header; ?>
<div class="main">
  <main class="l-center content">
    <div class="col-left">
      <div class="title">
        <span class="action">
          <svg viewBox="0 0 150 150" class="icon icon-shine">
            <use xlink:href="catalog/view/theme/default/icons/sprite.svg#icon_shine"></use>
          </svg>
          Choose your
          <svg viewBox="0 0 150 150" class="icon icon-shine">
            <use xlink:href="catalog/view/theme/default/icons/sprite.svg#icon_shine"></use>
          </svg>
        </span>
        <span class="logo-sm"><?php echo $name;?></span>
      </div>
      <div class="saber">
        <div id="saber-photo" class="saber-photo">
          <div class="saber-kernel">
            <img src="" alt="">
          </div>
          <div class="saber-hilt">
            <img src="" alt="">
          </div>
        </div>
      </div>
      <div class="options-selected">
        <div id="sounds" class="sounds">
          <svg viewBox="0 0 150 150" class="icon icon-sound">
            <use xlink:href="catalog/view/theme/default/icons/sprite.svg#icon_sound"></use>
          </svg>
          <span class="data">
            <strong>6</strong> Sounds Fonts
          </span>
        </div>
        <div id="colors" class="colors">
          <svg viewBox="0 0 150 150" class="icon icon-color">
            <use xlink:href="catalog/view/theme/default/icons/sprite.svg#icon_color"></use>
          </svg>
          <span class="data">
            <strong>10</strong> Color Profile
          </span>
        </div>
      </div>
      <div class="saber-footer">
        <div class="get-help">
          <svg viewBox="0 0 150 150" class="icon icon-info">
            <use xlink:href="catalog/view/theme/default/icons/sprite.svg#icon_info"></use>
          </svg>
          Get help buying. <strong><?php echo $help_email;?><?php echo (!empty($help_phone) && !empty($help_email)) ? ' • ' : '';?><?php echo $help_phone;?></strong>
        </div>
      </div>
    </div>
    <div class="col-right" id="product">
    <?php if ($products) : ?>
      <dl class="store-steps">
        <dt id="saber-series" class="expanded">
          Choose Series 
          <span class="selection" id="edit-series">
            <span id="series-selection"></span>
            <svg viewBox="0 0 150 150" class="icon icon-edit">
              <use xlink:href="catalog/view/theme/default/icons/sprite.svg#icon_edit"></use>
            </svg>
          </span>
        </dt>
        <dd class="choose-series">
          <ol>
          <?php foreach ($products as $product) : ?>
            <li class="serie">
              <?php if(count($product['name']) > 1):?>
              <input type="radio" name="series" id="product-<?php echo $product['product_id'];?>" class="choose-series-radio" data-name="<?php $name = reset($product['name']); echo str_replace(' ', '-', $name);?>" data-sounds="<?php echo (!empty($product['data_sound'])) ? $product['data_sound'] : 'no' ;?>" data-colors="<?php echo $product['data_color'];?>" data-min="<?php echo $product['minimum']; ?>" data-product="<?php echo $product['product_id'];?>">
              <?php else:?>
              <input type="radio" name="series" id="product-<?php echo $product['product_id'];?>" class="choose-series-radio" data-name="<?php echo str_replace(' ', '-', $product['name']);?>" data-sounds="<?php echo (!empty($product['data_sound'])) ? $product['data_sound'] : 'no' ;?>" data-colors="<?php echo $product['data_color'];?>" data-min="<?php echo $product['minimum']; ?>" data-product="<?php echo $product['product_id'];?>">
              <?php endif;?>
              <label for="product-<?php echo $product['product_id'];?>">
                <div class="title">
                  <?php if(count($product['name']) > 1):?>
                  <span class="name"><?php $name = reset($product['name']); echo str_replace('1', ' <svg viewBox="0 0 150 150" class="icon icon-thunder"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="catalog/view/theme/default/icons/sprite.svg#icon_thunder"></use></svg>', $name);?></span>
                  <span class="subtitle"><?php echo end($product['name']);?></span>
                  <?php else:?>
                    <span class="name"><?php echo str_replace('1', ' <svg viewBox="0 0 150 150" class="icon icon-thunder"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="catalog/view/theme/default/icons/sprite.svg#icon_thunder"></use></svg>', $product['name']);?></span>
                  <?php endif;?>
                </div>
                <div class="price">
                <?php if ($product['price']): ?>
                <?php if (!$product['special']) : ?>
                  <strong><?php echo $product['price']; ?></strong>
                <?php else : ?>
                  <strong><?php echo $product['special']; ?></strong>
                <?php endif;?>
                <?php endif;?>
                  <span class="currency"><?php echo $currency;?></span>
                </div>
                <?php if(!empty($product['data'])) :?>
                <?php foreach ($product['data'] as $key => $item) :?>
                <div class="feature">
                <?php if(count($item) > 1) :?>
                  <span class="count"><?php echo reset($item);?></span>
                  <span class="label"><?php echo end($item);?></span>
                <?php else:?>
                  <span class="label"><?php echo reset($item);?></span>
                <?php endif;?>
                </div>
                <?php endforeach;?>
                <?php endif;?>
            </li>
          <?php endforeach;?>
          </ol>
        </dd>
        <dt id="saber-hilt">
          Choose Hilt
          <span class="selection">
            <span id="hilt-selection"></span>
            <svg viewBox="0 0 150 150" class="icon icon-edit">
              <use xlink:href="catalog/view/theme/default/icons/sprite.svg#icon_edit"></use>
            </svg>
          </span>
        </dt>
        <dd class="choose-hilt">
          <?php foreach ($products as $product) : ?>
          <ol data-item="#product-<?php echo $product['product_id'];?>">
          <?php if(!empty($product['hilts'])) :?>
          <?php foreach ($product['hilts']['product_option_value'] as $item) :?>
            <li>
              <input type="radio" name="hilt" id="hilt-<?php echo $product['product_id'];?>-<?php echo $product['colors']['product_option_id'];?>-<?php echo $item['option_value_id'];?>" class="choose-hilt-radio" data-name="<?php echo $item['name'];?>" data-option="option[<?php echo $product['hilts']['product_option_id'];?>]" data-value="<?php echo $item['product_option_value_id'];?>" data-image="<?php echo $item['big_image'];?>">
              <label for="hilt-<?php echo $product['product_id'];?>-<?php echo $product['colors']['product_option_id'];?>-<?php echo $item['option_value_id'];?>">
                <div class="photo">
                  <img src="<?php echo $item['image'];?>" alt="<?php echo htmlspecialchars(implode(' ', $product['name']));?>">
                </div>
                <span class="label">
                  <svg viewBox="0 0 150 150" class="icon icon-check">
                    <use xlink:href="catalog/view/theme/default/icons/sprite.svg#icon_check"></use>
                  </svg><?php echo $item['name'];?>
                </span>
              </label>
            </li>
          <?php endforeach;?>
          <?php endif;?>
          </ol>
          <?php endforeach;?>
        </dd>
        <dt id="saber-color">
          Choose Color
          <span class="selection">
            <span id="colors-selection"></span>
            <svg viewBox="0 0 150 150" class="icon icon-edit">
              <use xlink:href="catalog/view/theme/default/icons/sprite.svg#icon_edit"></use>
            </svg>
          </span>
        </dt>
        <dd class="choose-color">
        <?php foreach ($products as $product) : ?>
          <ol data-item="#product-<?php echo $product['product_id'];?>">
          <?php if(!empty($product['colors'])) :?>
          <?php foreach ($product['colors']['product_option_value'] as $item) :?>
            <li>
              <input type="radio" name="color" id="color-<?php echo $product['product_id'];?>-<?php echo $product['colors']['product_option_id'];?>-<?php echo $item['option_value_id'];?>" class="choose-color-radio" data-name="<?php echo $item['name'];?>" data-option="option[<?php echo $product['colors']['product_option_id'];?>]" data-value="<?php echo $item['product_option_value_id'];?>" data-image="<?php echo $item['big_image'];?>">
              <label for="color-<?php echo $product['product_id'];?>-<?php echo $product['colors']['product_option_id'];?>-<?php echo $item['option_value_id'];?>">
                <div class="color">
                  <div class="crop">
                  <?php if($item['price']):?>
                    <div class="color-price"><?php echo $item['price_prefix'] . $item['price'];?></div>
                  <?php endif;?>
                    <img src="<?php echo $item['image'];?>" alt="<?php echo htmlspecialchars(implode(' ', $product['name']));?>">
                  </div>
                </div>
                <span class="label">
                  <svg viewBox="0 0 150 150" class="icon icon-check">
                    <use xlink:href="catalog/view/theme/default/icons/sprite.svg#icon_check"></use>
                  </svg><?php echo $item['name'];?>
                </span>
              </label>
            </li>
          <?php endforeach;?>
          <?php endif;?>
          </ol>
          <?php endforeach;?>
        </dd>
      </dl>
      <div class="col-right-footer">
        <div class="button-wrap">
          <button class="btn btn--transparent" type="button" id="button-cart">
            <div class="border"></div>
            <span class="text">Add to Cart</span>
          </button>
          <span class="label">add item to cart and continue shopping</span>
        </div>

        <div class="button-wrap">
          <button type="button" id="button-cart-checkout" class="btn">
            <svg viewBox="0 0 150 150" class="icon icon-shopping">
              <use xlink:href="catalog/view/theme/default/icons/sprite.svg#icon_shopping"></use>
            </svg>
            Checkout
          </button>
          <span class="label">add item to cart and checkout</span>
        </div>
      </div>
    </div>
    <?php endif;?>
    </div>
  </main> 
</div>
<script src="catalog/view/theme/default/js/home/app.js" type="text/javascript"></script>
<script type="text/javascript"><!--
selectedProduct(window.location.hash);

function selectedProduct(hash) {
  var input = $(hash);
  if(input.length < 1) {
    return false;
  } else {
    input.prop('checked', true);
    window.location.hash = '';
    //input.trigger('click');
    $('.choose-hilt').find('ol').addClass('hidden');
    $('.choose-hilt').find('[data-item="' + hash + '"]').removeClass('hidden');
    $('.choose-color').find('ol').addClass('hidden');
    $('.choose-color').find('[data-item="' + hash + '"]').removeClass('hidden');
    var data = input.data();
    $("#sounds strong").html(data.sounds), $("#colors strong").html(data.colors), "expert-t" === data.name ? $("#series-selection").html("Expert " + icon("thunder")) : $("#series-selection").html(data.name), $("#saber-series").addClass("done").removeClass("expanded"), $("#saber-hilt").hasClass("done") || $("#saber-hilt").addClass("expanded"), "checkbox" === $(".choose-color-radio").attr("type") && $(".choose-color-radio").attr("type", "radio").prop({
                    checked: !1,
                    disabled: !1
                }), "Master" === data.name && $(".choose-color-radio").attr("type", "checkbox").prop({
                    checked: !0,
                    disabled: !0
                });
  }
}

$('#button-cart, #button-cart-checkout').on('click', function(e) {
  var id = $(this).attr('id');
  var product = $('#product input[name=\'series\']:checked');
  if(product.length < 1) {
    if(id == 'button-cart-checkout') {
      document.location.href = '/index.php?route=checkout/cart';
    }
    return false;
  }
  var product_id = parseInt(product.data('product'));
  var hilt = $("#product [data-item='#product-"+product_id+"'] input[name='hilt']:checked");
  var color = $("#product [data-item='#product-"+product_id+"'] input[name='color']:checked");
  if(hilt.length < 1) {
    toast('Please, select hilt', 'error', function(){
      $('.toast').remove();
    });
    return false;
  }
  if(color.length < 1) {
    toast('Please, select color', 'error', function(){
      $('.toast').remove();
    });
  }
  var hilt_name = hilt.data('option');
  var data = {
    product_id : product_id,
    quantity : parseInt(product.data('min'))
  }
  data[hilt.data('option')] = hilt.data('value');
  var option_value = [];
  if(color.length > 1) {
    var option_name = '';
    $.each(color, function(index, item) {
      option_name = $(item).data('option');
      option_value.push($(item).data('value'));
    });
    data[option_name] = option_value;
  } else {
    option_value.push(color.data('value'));
    data[color.data('option')] = option_value;
  }
  
  $.ajax({
    url: 'index.php?route=checkout/cart/add',
    type: 'post',
    data: data,
    dataType: 'json',
    success: function(json) {
      if (json['success']) {
        setTimeout(function () {
            if(!$('.bg-li.cart .count').length) {
              $('.bg-li.cart a').append('<div class="count"><span>' + json['total'] + '</span></div>');
            } else {
              $('.bg-li.cart .count').html('<span>' + json['total'] + '</span>');
            }
          }, 100);
        $("#product input[type='radio']").prop('checked', false);
        if(id == 'button-cart-checkout') {
          document.location.href = '/index.php?route=checkout/cart';
        } else {
          toast('Item added to cart', 'success', function(){
            $('html, body').animate({ scrollTop: 0 }, 'slow');
            $('#saber-series').removeClass('done').addClass('expanded');
            $('#series-selection').html('');
            $('#saber-hilt').removeClass('done').removeClass('expanded');
            $('#hilt-selection').html('');
            $('#saber-color').removeClass('done').removeClass('expanded');
            $('#color-selection').html('');
            $('.toast').remove();
          });
        }
      }
    },
    error: function(xhr, ajaxOptions, thrownError) {
      alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
    }
  });
});
//--></script>
<?php echo $form_message;?>
<?php echo $footer; ?>
