<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'oolar');

/** MySQL database username */
define('DB_USER', 'root');

/** MySQL database password */
define('DB_PASSWORD', 'root');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8mb4');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'OVTenQ-g-U~WKFqLa*}D&-CJQ`g](T_PmSQ(8_|Jl~UU,BA;-U8*Y:pp[6P828U9');
define('SECURE_AUTH_KEY',  '<A.D(j?<8@pCK4q?0{82778K`V%~^E_bLO[5T.hk[JpBU;Q_9rGkq4y6_0{Ae1~S');
define('LOGGED_IN_KEY',    '0A@`@Gn`nJ|L]~YW^Q1r6ymV8=OvG787X&e(PO,GwH,qzxs&MG63DUB5RR?B^.=L');
define('NONCE_KEY',        '`)H7FCYg=A]AfmN@zB^RT-;Wo]^g+Bs(j1-als-el*Z~O`M`tp0L]vB(yn/;15kr');
define('AUTH_SALT',        '>AWg6oq:P$brstDo#4Jyf@kJ-~w n[7}NAAERg_3[>9W0}%Sm D*H$%S32iS:n<a');
define('SECURE_AUTH_SALT', '1M$1#oUGx]>c0IrGCAs.IXVGt<&{~D;0+9-vx_c>^yLCdbH+!J%R&~yhw&Q]3_Wc');
define('LOGGED_IN_SALT',   'pe9}(`3GV]=;>pVGUy/ss~7y!%@dG3:*nC45e:<k^*Z0J#Nv|^Gym`y^a@~<}mT4');
define('NONCE_SALT',       'QJ+q3M3L5BT:t4=5KvrBg,.Bh%cHAMR.}))$qr3^c.SGR;fcN]2,-g!pZS[2m29f');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
