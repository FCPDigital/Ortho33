<div class="toggler row">
	<div class="container ">
		<div class="toggler__list-container pad-container col-sm-5">
			<h2 class="toggler__title title--section">Nos magasins</h2>
			<ul class="toggler__list">
				{foreach from=$stores item=store}
				{counter assign='pos'}
					<li class="toggler__list-item {if $pos==1}toggler__list-item--active{/if}">
						{$smarty.foreach.store.iteration}<a href="#" data-toggle-id="{$store.id}"><i class="fa fa-arrow-right margin-right-small" aria-hidden="true"></i>{$store.name}</a>
					</li>
				{/foreach}
			</ul>
		</div>
		<div class="toggler__displayer col-sm-7">
			{counter start=0}
			{foreach from=$stores item=store}
				{counter assign='pos'}
				<div id="toggler-item-{$store.id}" class="toggler__item {if $pos==1}toggler__item--active{/if}">
					<div class="toggler__item-content">
						<p class="toggler__item-title">{$store.name}</p>
						<p class="toggler__item-description">
							{$store.address1}<br>
							{$store.address2}<br>
							Tel : {$store.phone}<br>
							Fax : {$store.fax}<br>
						</p>
					</div>
					<div class="toggler__item-img-container">
						<img class="toggler__item-img" src="{$store.img}" alt="">
					</div>
					<div class="clr"></div>
				</div>
			{/foreach}
		</div>
	</div>
</div>
