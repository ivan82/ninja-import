var NinjaImportFileType = {
	SCRIPT: 0,
	STYLE: 1
};

var NinjaImport = {
	fileNames: [],
	fileObjects: [],
	index: 0,
	onLoaded: undefined,
	fileType: undefined,

	files: function(fileNames, fileType, onLoaded){
		if(!fileNames){ return; }

		if(this.isString(fileNames)){
			this.fileNames.push(fileNames);
		}else if(fileNames instanceof Array && fileNames.length > 0){
			this.fileNames = this.fileNames.concat(fileNames);
		}

		this.fileType = fileType ? fileType : NinjaImportFileType.SCRIPT;
		this.onLoaded = onLoaded;
		this.loadFiles();
	},

	loadFiles: function(){
		var index = NinjaImport.index;
		var indexLength = NinjaImport.fileNames.length;
		if(index < indexLength){
			if(NinjaImport.fileType === NinjaImportFileType.STYLE){
				for(index; index < indexLength; index++){
					NinjaImport.addFile(NinjaImport.fileNames[index], NinjaImport.fileType);
					NinjaImport.index++;
				}
			}else{
				//load the next file when the current file has finished loading
				NinjaImport.addFile(NinjaImport.fileNames[index], NinjaImport.fileType, NinjaImport.loadFiles);
				NinjaImport.index++;
			}
		}

		if(NinjaImport.onLoaded && index === indexLength){
			NinjaImport.onLoaded();
		}
	},

	addFile: function(file, fileType, onLoaded){
		if(!this.isString(file) || this.isFileAlreadyAdded(file)){
			return;
		}

		var element;
		var elementTarget;
		if(fileType === NinjaImportFileType.STYLE){
			element = this.createStylesheetElement(file);
			elementTarget = document.getElementsByTagName('head')[0];
		}else{
			element = this.createScriptElement(file, onLoaded);
			elementTarget = document.getElementsByTagName('script')[0].parentNode;
		}
		elementTarget.appendChild(element);

		var fileObject = this.createFileObject(file, element, fileType, onLoaded);
		this.fileObjects.push(fileObject);
	},

	fileIndex: function(file){
		for (var i = this.fileObjects.length - 1; i >= 0; i--) {
			if(this.fileObjects[i].file === file){
				return i;
			}
		}
		return -1;
	},

	isFileAlreadyAdded: function(file){
		return this.fileIndex(file) !== -1;
	},

	createFileObject: function(file, element, fileType, onLoaded){
		return {
			file: file,
			element: element,
			fileType: fileType,
			onLoaded: onLoaded
		};
	},

	createScriptElement: function(file, onLoaded){
		var element = document.createElement('script');
		element.type = 'text/javascript';
		element.src = file;
		element.onload = onLoaded;
		return element;
	},

	createStylesheetElement: function(file){
		var element = document.createElement('link');
		element.type = 'text/css';
		element.rel = 'stylesheet';
		element.href = file;
		return element;
	},

	isString: function(file){
		return typeof file === 'string';
	}
};
