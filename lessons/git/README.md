Download git [here](https://git-scm.com/downloads) 
#Git Tutorial
https://git-scm.com/book/en/
#Git Commands
##Create Repo
Create a new local repository - `git init [project name]`

Download a repository - `git clone [url]`

##Make Changes
List all new or modified files - `git status`

Add the file(s) to the staging area - `git add [file]`

Unstage a file - `git reset [staged-file]`

Unstage all files - `git reset`

Show the difference between the working copy and the last commit - `git diff`

Show the difference between the staging area and the last commit - `git diff --staged`

Unstage the last commit and the working directory - `git reset --hard` **

###Move/Rename/Delete Files
Move/rename a file and stage the change - `git mv [old-file-name] [new-file-name]`

Delete a file and stage the change - `git rm [file]`

Add all modified/deleted files - `git add -u` (vs. `git add *` - only adds all modified or new files)

##Synchronize Changes
`git fetch`

`git merge`

Get upstream changes to local repo - `git pull`

Upload commits to remote repo - `git push`

##Branching
List all local branches - `git branch`

Create a new branch - `git branch [branch-name]`

Switch branch - `git checkout [branch-name]`

Merge branch - `git merge [branch]`

Delete a branch - `git branch -d [branch-name]`

##History
View commit history (most recent first) - `git log`/`git log --oneline`

View commit history for a file - `git log --follow [file]`

Update local files to match a commit - `git checkout [commit-SHA]`

Check out a previous version of a file - `git checkout [commit-SHA] [file]`

View changes for a commit - `git show [commit-SHA]`

##Ignoring Files
Create a file named ".gitignore" in the project root folder.
* Ignore specific file: list the file name
* Ignore file types: *.[filetype]
* Ignore folders: [folder-name]/

##Configuration
Change name - `git config --global user.name "[name]"`

Change email - `git config --global user.email "[email]"`

##I messed up :(
######See also: [History](#history)
Go back to the current state of the project - `git checkout master`

Undo a local commit (and keep working directory changes) - `git reset --soft HEAD~`

Undo a local commit (and remove working directory changes) - `git reset --hard HEAD~` **

**Permanent undo (unable to retrieve original copy)
