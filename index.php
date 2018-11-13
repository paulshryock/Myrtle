<?php

include( 'functions.php' );

// Name of Articles collection

$collection = api_getCollectionSchema( 'articles' );
$label = $collection->label;

echo '<h1>' . $label . '</h1>';

// List of article entry titles

$articles = api_getCollectionEntries( 'articles' )->entries;

echo '<ul>';

foreach ($articles as $article) {

	$status = $article->status[0];
	$title = $article->title;
	$slug = $article->slug;
	$content = $article->content;

	if ( 'Published' == $status ) { ?>

		<li>
			<article>
				<header>
					<h2>
						<a href="<?php echo $slug; ?>"><?php echo $title; ?></a>
					</h2>
				</header>
				<div>
					<?php echo $content; ?>
				</div>
			</article>
		</li>

	<?php }

}

echo '</ul>';

?>

<script type="text/javascript" src="js/auth.js"></script>
<script type="text/javascript" src="js/script.js"></script>