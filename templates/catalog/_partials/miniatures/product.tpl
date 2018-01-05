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
{block name='product_miniature_item'}
  {$type = (isset($type) && $type == 'list-item') ? 'list-item' : 'miniature' }
  {$style = (isset($style) && $style == 'border') ? 'border' : 'none' }
  {if $type === 'list-item'}
    {$size = 12}
  {elseif $type === 'miniature'}
    {$size = 3}
  {/if}
  
  <div class="col-sm-{$size}">
    <article class="product product--{$type} {if $style==='border'}product--border border-heritance{/if}" data-id-product="{$product.id_product}" data-id-product-attribute="{$product.id_product_attribute}" itemscope itemtype="http://schema.org/Product">
    <div class="product__thumbnail-container {if $type==='list-item'}row{/if}">
      {block name='product_thumbnail'}
        <a href="{$product.url}">
          <img
            class="product__thumbnail {if $type==='list-item'}col-sm-3{/if}"
            src = "{$product.cover.bySize.home_default.url}"
            alt = "{if !empty($product.cover.legend)}{$product.cover.legend}{else}{$product.name|truncate:30:'...'}{/if}"
            data-full-size-image-url = "{$product.cover.large.url}"
          >
        </a>
      {/block}

      {if $type==='list-item'}<div class="product__item-block col-sm-9">{/if}

      <div class="product__description">
        {block name='product_name'}
          <h3 class="product__title" itemprop="name"><a href="{$product.url}">{$product.name|truncate:30:'...'}</a></h3>
        {/block}

        {block name='product_price_and_shipping'}
          {if $product.show_price}
            <div class="product-price-and-shipping margin-bottom-small">
              {if $product.has_discount}
                {hook h='displayProductPriceBlock' product=$product type="old_price"}

                <span class="sr-only">{l s='Regular price' d='Shop.Theme.Catalog'}</span>
                <span class="product__price product__price--old">{$product.regular_price}</span>
                {if $product.discount_type === 'percentage'}
                  <span class="product__discount">{$product.discount_percentage}</span>
                {/if}
                <span itemprop="price" class="product__price product__price--reduce">{$product.price}</span>
              {else}
                <span itemprop="price" class="product__price">{$product.price}</span>
              {/if}

              {hook h='displayProductPriceBlock' product=$product type="before_price"}

              <span class="sr-only">{l s='Price' d='Shop.Theme.Catalog'}</span>

              {hook h='displayProductPriceBlock' product=$product type='unit_price'}

              {hook h='displayProductPriceBlock' product=$product type='weight'}
            </div>
          {/if}
        {/block}
        
        {if $type === 'list-item'}
        <div class="product__content">
          {$product.description_short nofilter}  
        </div>
        {/if}
        
        
        {block name='product_reviews'}
          {hook h='displayProductListReviews' product=$product}
        {/block}
      </div>

      {block name='product_flags'}
        <ul class="product__flags">
          {foreach from=$product.flags item=flag}
            <li class="product__flag {$flag.type}">{$flag.label}</li>
          {/foreach}
        </ul>
      {/block}
      
      <div class="highlighted-informations{if !$product.main_variants} no-variants{/if} hidden-sm-down">
        {block name='quick_view'}
          <a class="btn btn--grey-orange" href="{$product.url}">Voir</a>
        {/block}

        {block name='product_variants'}
          {if $product.main_variants}
            {include file='catalog/_partials/variant-links.tpl' variants=$product.main_variants}
          {/if}
        {/block}
      </div>

      {if $type==='list-item'}</div>{/if}
    
    </div>
  </article>
</div>
{/block}
