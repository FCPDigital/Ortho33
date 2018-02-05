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
<div class="container">
  <div class="row">
    {block name='hook_footer_before'}
      {hook h='displayFooterBefore'}
    {/block}
  </div>
</div>
<div class="footer">
  <div class="container">
    <div class="row">
      <div class="col-sm-3 footer__section">
        <h3 class="footer__title">Plan du site</h3>
        <ul class="footer__list">
          <li class="footer__list-item"><a href="">Produits</a></li>
          <li class="footer__list-item"><a href="">A propos</a></li>
          <li class="footer__list-item"><a href="">Contactez-nous</a></li>
        </ul>
      </div>

      <div class="col-sm-3 footer__section">
        <h3 class="footer__title">Compte</h3>
        <ul class="footer__list">
          <li class="footer__list-item"><a href="">Mon Compte</a></li>
          <li class="footer__list-item"><a href="">Mes commandes</a></li>
          <li class="footer__list-item"><a href="">Mon panier</a></li>
        </ul>
      </div>

      <div class="col-sm-3 footer__section">
        <h3 class="footer__title">Contact</h3>
        <ul class="footer__list">
          <li class="footer__list-item"><a href="">Mérignac</a></li>
          <li class="footer__list-item"><a href="">Bordeaux</a></li>
          <li class="footer__list-item"><a href="">La-Teste-de-Buch</a></li>
        </ul>
      </div>

      <div class="col-sm-3 footer__section">
        <h3 class="footer__title">Paiement</h3>
        <div class="footer__payments">
          <img class="footer__payment" src="{$smarty.const._THEME_IMG_DIR_}/icon/picto-visa.png" alt="Paiement par VISA">
          <img class="footer__payment" src="{$smarty.const._THEME_IMG_DIR_}/icon/picto-mastercard.png" alt="Paiement par Mastercard">
          <img class="footer__payment" src="{$smarty.const._THEME_IMG_DIR_}/icon/picto-paypal.png" alt="Paiement par Paypal">
          <div class="footer__payment--fullsize">
            <img class="footer__payment-cheque" src="{$smarty.const._THEME_IMG_DIR_}/icon/picto-cheque.png" alt="Paiement par Chèque">
            <p>Paiement par chèque</p>
          </div>
        </div>
      </div>
      <div class="col-sm-12 footer__copyright">
        <p>
          <a class="link-invisible" href="">Mention légales</a> | 
          <a class="link-invisible" href="">Conditions générales de vente</a> | 
          <a class="link-invisible" href="">@ 2017 Ortho 33</a> |
          <a class="link-invisible" href="">FCP Digital</a>
        </p>
      </div>
      
    </div><!-- End Row -->
  </div><!-- End Container -->
</footer>
    
 
    

{*block name='hook_footer'}
  {hook h='displayFooter'}
{/block*}

{*block name='hook_footer_after'}
  {hook h='displayFooterAfter'}
{/block*}

{*block name='copyright_link'}
  <a class="_blank" href="http://www.prestashop.com" target="_blank">
    {l s='%copyright% %year% - Ecommerce software by %prestashop%' sprintf=['%prestashop%' => 'PrestaShop™', '%year%' => 'Y'|date, '%copyright%' => '©'] d='Shop.Theme.Global'}
  </a>
{/block*}
