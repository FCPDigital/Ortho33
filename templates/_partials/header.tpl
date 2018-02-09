{**
 * 2007-2017 PrestaShop
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Academic Free License 3.0 (AFL-3.0)
 * that is bundled with this package in the file LICENSE.txt.
 * It is also available through the world-wide-web at this URL:
 * https://opensource.org/licenses/AFL-3.0
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * DISCLAIMER
 *
 * Do not edit or add to this file if you wish to upgrade PrestaShop to newer
 * versions in the future. If you wish to customize PrestaShop for your
 * needs please refer to http://www.prestashop.com for more information.
 *
 * @author    PrestaShop SA <contact@prestashop.com>
 * @copyright 2007-2017 PrestaShop SA
 * @license   https://opensource.org/licenses/AFL-3.0 Academic Free License 3.0 (AFL-3.0)
 * International Registered Trademark & Property of PrestaShop SA
 *}
{block name='header_banner'}
  <div class="header-banner">
    {hook h='displayBanner'}
  </div>
{/block}

{block name='header_nav'}
  <nav class="header-nav">
    <div class="container-fluid">
        <div class="row">
          <!-- Desktop first header -->
          <div class="header-top header-top--desktop">
            <div class="float-left inline">
              <a class="header-top__logo" href="{$urls.base_url}">
                <img class="" src="{$shop.logo}" alt="{$shop.name}">
              </a>
              <a href="tel:+556344605" class="btn btn--no-border btn--green btn--fa btn--size-xl">
                <i class="fa fa-phone" aria-hidden="true"></i>05 56 34 46 05
              </a>
              <a href="{$urls.pages.contact}" class="btn btn--no-border btn--green btn--fa">
                <i class="fa fa-envelope" aria-hidden="true"></i><span class="underline">Contactez-nous ici</span>
              </a>  
            </div>
       
            <div class="inline float-right margin-top-small margin-right-normal">
              {hook h='displaySearch'}
              {hook h='displayNav2'}
            </div>

          </div>
          <!-- Responsive first header -->
          <div class="text-center header-top header-top--responsive">
            <div class="header-top__burger float-left padding-small" id="menu-burger">
              <i class="fa fa-bars" aria-hidden="true"></i>
            </div>
            <a class="header-top__logo" href="{$urls.base_url}">
              <img class="logo img-responsive" src="{$shop.logo}" alt="{$shop.name}">
            </a>
            <div class="inline header-top__nav2">
              {hook h='displayNav2'}
            </div>
            
            <div class="clearfix"></div>
          </div>
        </div>
    </div>
  </nav>
{/block}

{block name='header_top'}
  <div class="header-bottom-container">
      <div class="header-bottom header-bottom--desktop">
        {hook h='displayTop'}
      </div>
      
      
      <div id="menu-responsive" class="header-responsive header-responsive--hide">
        <a href="" rel="nofollow" id="menu-close">
          <i class="fa fa-times" aria-hidden="true"></i>
        </a>
        {hook h='displayTop'}
      </div>
      
  </div>
  {hook h='displayNavFullWidth'}
{/block}
