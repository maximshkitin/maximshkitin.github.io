<?php echo $header; ?>
  <div class="user-page order order-list" id="content">
    <div class="container">
      <div class="row">
        <aside class="col-md-4" id="aside">
          <div id="avatar">
            <img src="<?php echo $avatar;?>" alt="<?php echo htmlspecialchars($firstname . ' ' .$lastname);?>">
          </div>
          <h2>My Account</h2>
          <ul>
            <li><a href="<?php echo $dashboard;?>"><i class="fa fa-tachometer"></i>  Dashboard</a></li>
            <li><a href="<?php echo $order; ?>"><i class="fa fa-shopping-cart"></i> Orders</a></li>
            <li><a href="<?php echo $edit; ?>"><i class="fa fa-user"></i> Account Details</a></li>
            <li><a href="<?php echo $knb; ?>"><i class="fa fa-archive"></i> Knowledge Base</a></li>
            <li><a href="<?php echo $mb; ?>"><i class="fa fa-group"></i> Support Message board</a></li>
          </ul>
          <div class="note">
            <i class="fa fa-info-circle"></i>
            Visit <a href="<?php echo $knb;?>"><strong>knowlegdebase</strong></a> or <a href="<?php echo $mb;?>"><strong>message board</strong></a> for support
          </div>
        </aside>
        <section class="col-md-8" id="right-side">
          <div class="page-nav">
            <ul class="clearfix">
              <?php foreach ($breadcrumbs as $breadcrumb) : ?>
              <li><a href="<?php echo $breadcrumb['href']; ?>"><?php echo $breadcrumb['text']; ?></a></li>
              <?php endforeach; ?>
            </ul>
          </div>
          <hr class="dark">
          <div class="order-info clearfix">
            <h1 class="content-heading">
              <i class="fa fa-shopping-cart"></i>
              Orders
            </h1>
            <?php if ($success) : ?>
            <div class="alert alert-success"><i class="fa fa-check-circle"></i> <?php echo $success; ?></div>
            <?php endif; ?>
            <?php if ($error_warning) : ?>
            <div class="alert alert-danger"><i class="fa fa-exclamation-circle"></i> <?php echo $error_warning; ?></div>
            <?php endif; ?>
            <ul>
              <li<?php echo ($filter == 'active') ? ' class="active"' : '';?>>
                <a href="<?php echo $actite;?>">Active Orders</a>
              </li>
              <li<?php echo ($filter == 'unpaid') ? ' class="active"' : '';?>>
                <a href="<?php echo $unpaid;?>">Unpaid Orders</a>
              </li>
              <li<?php echo ($filter == 'past') ? ' class="active"' : '';?>>
                <a href="<?php echo $past;?>">Past Orders</a>
              </li>
            </ul>
          </div>
          <?php if ($orders) : ?>
          <div class="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th class="tal">Order ID</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th>Payment</th>
                  <th>Invoice</th>
                </tr>
              </thead>
              <tbody>
                <?php foreach ($orders as $order) : ?>
                <tr>
                  <td>
                    <a href="<?php echo $order['view']; ?>">#<?php echo $order['order_id']; ?></a>
                    <div class="status <?php echo $order['status_color'];?>">
                      <span>pending</span>
                    </div>
                  </td>
                  <td>
                    <?php echo $order['date_added']; ?>
                  </td>
                  <td><?php echo $order['total']; ?></td>
                  <?php if(!empty($order['payment'])):?>
                  <td class="pay-status paid">
                    <p>
                      <i class="fa fa-check-circle-o"></i>
                      paid
                    </p>
                    <span>
                      on
                      <span class="date">
                        <?php echo date('M n, Y', strtotime($order['payment']['date_add']));?>
                      </span>
                    </span>
                  </td>
                  <?php else:?>
                  <td class="pay-status unpaid">
                    <p>
                      <i class="fa fa-info-circle"></i>
                      unpaid
                    </p>
                    <a href="<?php echo $order['reorder'];?>">
                      Pay now
                    </a
                  </td>
                  <?php endif;?>
                  <td>
                    <ul class="clearfix">
                      <li><a href="<?php echo $order['download'];?>">
                        <i class="fa fa-download"></i>
                      </a></li>
                      <li><a href="#" data-info="<?php echo $order['view']; ?>" class="print">
                        <i class="fa fa-print"></i>
                      </a></li>
                      <li><a href="<?php echo $order['pdf'];?>" target="_blank">
                        <i class="fa fa-file-pdf-o"></i>
                      </a></li>
                    </ul>
                  </td>
                </tr>
                <?php endforeach;?>
              </tbody>
            </table>
          </div>
          <div class="empty"></div>
          <?php if($pagination):?>
          <hr class="dark">
          <?php echo $pagination; ?>
          <?php endif;?>
          <?php else:?>
          <div class="empty"></div>
          <div class="info-box">
            <p>
              No active order. Buy product in the <a href="<?php echo $store;?>">store</a>  now, or if you have already picked saber(s) before then <a href="<?php echo $cart;?>">view</a>  cart to proceed to checkout.
            </p>
          </div>
          <?php endif;?>
        </section>

          </div>
        </section>
      </div>
    </div>
  </div>
  <div id="modal">
    <div class="loader-icon"></div>
  </div>

  <script src="catalog/view/theme/default/js/print.js"></script>
  <script type="text/javascript"><!--
  $('.print').on('click', function(e) {
    e.preventDefault();
    var url = $(this).data('info');
    $.get(url, { "_": $.now() }, function(data, status){
        var page = $(data);
        page.find('#content-table').print({
          globalStyles: false,
          iframe: true,
          noPrintSelector: ".no-print",
          append: null,
          prepend: null,
          manuallyCopyFormValues: true,
          deferred: $.Deferred(),
          timeout: 750,
          doctype: '<!doctype html>'
        });
    });
  });
  //--></script>
<?php echo $footer; ?>
