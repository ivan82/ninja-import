# ninja-import
Import style or js files

# Example

```html
<script src="ninja-import.js"></script>
<script>
	NinjaImport.files(
		['css/font-awesome.min.css',
		'css/bootstrap.min.css',
		'css/default.css'],
		NinjaImportFileType.STYLE);

	NinjaImport.files(
		['js/jquery-2.2.0.min.js',
		'js/bootstrap-3.3.5.min.js',
		'js/google.map.overlay.js',
		'js/error-1.0.0.js',
		'js/core-1.0.0.js'
		]);
</script>
```
