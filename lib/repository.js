class Repository{
    constructor(context){
        const {octokit, payload} = context;
        this.repo = context.repo();
        this.payload = payload;
        this.octokit = octokit;
    }

    changeVisibility(){
        return this.octokit.repos.update({
            owner: this.repo.owner,
            repo: this.repo.owner,
            repo: this.repo.repo,
            private: true,
            visibility: 'private',
        })
    }

    async getVisibility(){
        const repoInfo = await this.octokit.repos.get({
            owner: this.repo.owner,
            repo: this.repo.repo
        })
        return repoInfo.data.private
    }
}
