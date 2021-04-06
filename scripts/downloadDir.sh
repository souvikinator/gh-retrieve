#!/bin/bash
#usage: arg1: output directory, arg2: repo clone url, arg3: template name
#get no of args passed
TOTALARGS="$#"
if [[ $TOTALARGS -lt 3 ]]; then
	echo "$# arguments specified, required 3 :("
	echo "arg1: outdir, arg2: git repo url, arg3: template name"
	exit 1
fi
#dir to save template, git url of repo, template name
DIR="$1"
GITURL="$2"
TMPLNAME="$3"

#check whether directory exits
if [[ ! -d "$DIR" ]]; then
	echo "$DIR does not exist"
	#make dir
	mkdir "$DIR"
	echo "$DIR created"
	#get inside the folder
	cd $DIR
	#git init
	git init
	#set origin
	git remote add -f origin $GITURL
fi

#get inside the folder
cd $DIR

#perform sparse checkout
git config core.sparsecheckout true
echo "$TMPLNAME" >>.git/info/sparse-checkout
git checkout master
git pull origin master
