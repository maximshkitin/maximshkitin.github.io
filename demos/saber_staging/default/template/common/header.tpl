<!DOCTYPE html>
<html dir="<?php echo $direction; ?>" lang="<?php echo $lang; ?>">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title><?php echo $title; ?></title>
<base href="<?php echo $base; ?>" />
<?php if ($description) { ?>
<meta name="description" content="<?php echo $description; ?>" />
<?php } ?>
<?php if ($keywords) { ?>
<meta name="keywords" content= "<?php echo $keywords; ?>" />
<?php } ?>
<link rel="stylesheet" href="catalog/view/theme/default/stylesheet/font-awesome.css">
<link rel="stylesheet" href="catalog/view/theme/default/stylesheet/bootstrap.css">
<?php 
$replace = array(
  'product-category-' => 'catalog/view/theme/default/stylesheet/store.css',
  'checkout-' => 'catalog/view/theme/default/stylesheet/store.css'
);
$style = 'catalog/view/theme/default/stylesheet/style.css';
foreach ($replace as $key => $value) {
  if (strpos($class, $key) !== false) {
    $style = $value;
    break;
  }
}
?>
<link rel="stylesheet" href="<?php echo $style;?>">
<script src="catalog/view/theme/default/js/jquery-1.12.0.min.js" type="text/javascript"></script>
<script src="catalog/view/javascript/common.js" type="text/javascript"></script>
<?php 
$replace = array(
  'information-' => 'page',
  'error-' => 'page',
  'product-product-' => 'product',
  'product-category-' => 'store',
  'checkout-' => 'store checkout',
  'blog' => 'knlg'
);
foreach ($replace as $key => $value) {
  if (strpos($class, $key) !== false) {
    $class = $value;
    break;
  }
}
?>
<?php $class = str_replace('common-', '', $class);?>
<?php if($class == 'home'):?>

<?php else:?>
<script src="catalog/view/theme/default/js/jquery.liveFilter.js" type="text/javascript"></script>
<script src="catalog/view/theme/default/js/common.js" type="text/javascript"></script>
<?php endif;?>
<?php foreach ($styles as $style) { ?>
<link href="<?php echo $style['href']; ?>" type="text/css" rel="<?php echo $style['rel']; ?>" media="<?php echo $style['media']; ?>" />
<?php } ?>
<?php foreach ($links as $link) { ?>
<link href="<?php echo $link['href']; ?>" rel="<?php echo $link['rel']; ?>" />
<?php } ?>
<?php foreach ($scripts as $script) { ?>
<script src="<?php echo $script; ?>" type="text/javascript"></script>
<?php } ?>
<?php foreach ($analytics as $analytic) { ?>
<?php echo $analytic; ?>
<?php } ?>
</head>
<body class="<?php echo $class; ?>">
<header class="site-header" id="top">
  <div class="fixed-bar">
  <div id="top-line"></div>
  <div class="clearfix" id="header-content">
    <div class="container">
      <div class="soc-networks">
        <?php if(!empty($social)):?>
        <ul>
          <?php foreach ($social as $item) :?>
          <li><a href="<?php echo $item->url;?>" target="_blank"><i class="<?php echo $item->class;?>"></i></a></li>
          <?php endforeach;?>
        </ul>
      <?php endif;?>
      </div>
      <div id="logo">
        <a href="<?php echo $home;?>"></a>
      </div>
        <div id="main-nav">
          <nav>
            <ul>
              <li class="bg-li store dd-menu">
                <a href="<?php echo $store;?>">Store</a>
                <?php if ($products) : ?>
                <ul class="clearfix">
                  <?php foreach ($products as $product) :?>
                  <li>
                    <a href="<?php echo $product['href']; ?>">
                    <?php if(count($product['name']) > 1) :?>
                      <?php echo reset($product['name']);?><br />
                      <span><?php echo end($product['name']);?></span>
                      <i class="fa fa-chevron-right"></i>
                    <?php else :?>
                      <?php echo reset($product['name']);?>
                    <?php endif;?>
                    </a>
                  </li>
                  <?php endforeach;?>
                </ul>
                <?php endif;?>
              </li>
              <li class="bg-li cart">
                <a href="<?php echo $shopping_cart;?>"><?php echo $text_cart_title;?>
                <?php if($total > 0):?>
                  <div class="count">
                    <span><?php echo $total;?></span>
                  </div>
                <?php endif;?>
                </a>
              </li>
              <li class="dd-menu">
                <span></span>
                <span></span>
                <span></span>
                <ul class="clearfix">
                  <li>
                    <a href="<?php echo $home;?>">
                      <i class="fa fa-home"></i>
                      <span><?php echo $text_home;?></span>
                    </a>
                  </li>
                  <li>
                    <a href="<?php echo $contact;?>">
                      <i class="fa fa-info-circle"></i>
                      <span><?php echo $text_about;?></span>
                    </a>
                  </li>
                  <li>
                    <a href="<?php echo $contact;?>#faq">
                      <i class="fa fa-question-circle"></i>
                      <span><?php echo $text_faq;?></span>
                    </a>
                  </li>
                  <?php if($loged):?>
                  <li>
                    <a href="<?php echo $account;?>">
                      <i class="fa fa-user"></i>
                      <span>My Account</span>
                    </a>
                  </li>
                  <li>
                    <a href="<?php echo $logout;?>">
                      <i class="fa fa-sign-out"></i>
                      <span>Logout</span>
                    </a>
                  </li>
                  <?php else:?>
                  <li>
                    <a href="<?php echo $login;?>">
                      <i class="fa fa-sign-in"></i>
                      <span>Login</span>
                    </a>
                  </li>
                  <?php endif;?>
                  <li>
                    <a href="<?php echo $contact;?>#contact">
                      <i class="fa fa-envelope"></i>
                      <span><?php echo $text_contact;?></span>
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>
<?php if($class != 'product'):?>
</header>
<?php endif;?>

